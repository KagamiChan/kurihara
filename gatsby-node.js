const { each } = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode, basePath: 'content' })
    createNodeField({
      node,
      value,
      name: 'slug',
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx(sort: { fields: [frontmatter___publish_date], order: DESC }) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            fields {
              slug
            }
            frontmatter {
              title
            }
            code {
              scope
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

  const posts = result.data.allMdx.edges

  each(posts, (post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: componentWithMDXScope(
        path.resolve(__dirname, 'src/components/blog-post.js'),
        post.node.code.scope,
      ),
      context: {
        previous,
        next,
        slug: post.node.fields.slug,
        id: post.node.id,
      },
    })
  })

  return Promise.resolve()
}
