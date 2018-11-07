const { each, first, compact, split, chunk, filter } = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const TEMPLATES = {
  blog: path.resolve(__dirname, 'src/templates/blog-post.js'),
  about: path.resolve(__dirname, 'src/templates/page.js'),
}

const ITEM_PER_PAGE = 16

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
