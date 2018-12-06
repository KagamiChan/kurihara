const { each, first, compact, split, chunk, filter, map } = require('lodash')
const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const yaml = require('js-yaml')
const { createFilePath } = require('gatsby-source-filesystem')
const wordCount = require('word-count')

const TEMPLATES = {
  blog: path.resolve(__dirname, 'src/templates/blog-post.js'),
  about: path.resolve(__dirname, 'src/templates/page.js'),
}

const ITEM_PER_PAGE = 10

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const p = createFilePath({ node, getNode, basePath: 'content' })

    createNodeField({
      node,
      value: p,
      name: 'slug',
    })

    createNodeField({
      node,
      value: first(compact(split(p, '/'))),
      name: 'type',
    })

    const words = wordCount(node.rawMarkdownBody)
    const WORD_PER_MINUTE = 160

    createNodeField({
      node,
      value: {
        words,
        minutes: Math.round(words / WORD_PER_MINUTE),
      },
      name: 'timeToRead',
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___publish_date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              type
              timeToRead {
                words
                minutes
              }
            }
            frontmatter {
              title
              publish_date
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    return Promise.reject(result.errors)
  }

  const posts = result.data.allMarkdownRemark.edges

  each(
    chunk(filter(posts, p => p.node.fields.type === 'blog'), ITEM_PER_PAGE),
    (slice, index, slices) => {
      // pagination starts from 1
      const page = index + 1

      createPage({
        path: index === 0 ? '/blog' : `/blog/page/${page}`,
        component: path.resolve(
          __dirname,
          'src/templates/paginated-blog-index.js',
        ),
        context: {
          page,
          total: posts.length,
          pages: slices.length,
          prev: page - 1,
          next: page === slices.length ? 0 : page + 1,
          limit: ITEM_PER_PAGE,
          items: slice,
        },
      })
    },
  )

  createRedirect({ fromPath: '/blog/page/1', toPath: '/blog' })

  each(posts, (post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component:
        TEMPLATES[post.node.fields.type] ||
        path.resolve(__dirname, 'src/templates/page.js'),
      context: {
        previous,
        next,
        slug: post.node.fields.slug,
      },
    })
  })

  return Promise.resolve()
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-date-fns`,
  })
}

exports.onPostBuild = () => {
  const files = glob.sync(path.join(__dirname, '/src/locales/**/*.yml'))
  map(files, file => {
    const content = fs.readFileSync(file, 'utf8')
    const dest = path
      .resolve(
        __dirname,
        'public',
        path.relative(path.join(__dirname, 'src'), file),
      )
      .replace(/yml$/, 'json')
    fs.outputJsonSync(dest, yaml.safeLoad(content))
  })
}
