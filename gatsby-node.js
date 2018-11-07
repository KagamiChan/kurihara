const { each, first, compact, split } = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const TEMPLATES = {
  blog: path.resolve(__dirname, 'src/templates/blog-post.js'),
  about: path.resolve(__dirname, 'src/templates/page.js'),
}

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
  const { createPage } = actions
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
