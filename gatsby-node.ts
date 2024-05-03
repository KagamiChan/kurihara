/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

/* eslint-disable import/no-extraneous-dependencies */
import { each, first, compact, split, chunk, filter } from 'lodash'
import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import wordCount from 'word-count'
import { GatsbyNode } from 'gatsby'

const SRC = path.resolve(__dirname, './src')

const TEMPLATES = {
  blog: path.resolve(SRC, 'templates/blog-post.tsx'),
  about: path.resolve(SRC, 'templates/page.tsx'),
}

const ITEM_PER_PAGE = 10

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
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

    const words = wordCount(
      (node as unknown as Queries.MarkdownRemark).rawMarkdownBody!,
    )
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

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage, createRedirect } = actions

  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      allMarkdownRemark(sort: [{ frontmatter: { publish_date: DESC } }]) {
        edges {
          node {
            id
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

  const posts = result?.data?.allMarkdownRemark.edges

  if (!posts) {
    return Promise.resolve()
  }

  each(
    chunk(
      filter(posts, (p) => p?.node?.fields?.type === 'blog'),
      ITEM_PER_PAGE,
    ),
    (slice, index, slices) => {
      // pagination starts from 1
      const page = index + 1

      createPage({
        path: index === 0 ? '/blog' : `/blog/page/${page}`,
        component: path.resolve(SRC, 'templates/paginated-blog-index.tsx'),
        context: {
          page,
          total: posts?.length,
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

    createPage({
      path: post?.node?.fields?.slug!,
      component:
        TEMPLATES[post?.node?.fields?.type as keyof typeof TEMPLATES] ||
        path.resolve(SRC, 'templates/page.tsx'),
      context: {
        previous,
        slug: post?.node?.fields?.slug,
      },
    })
  })

  return Promise.resolve()
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
  plugins,
}) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: 'process/browser' })],
    })
  }
}
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions,
}) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }

    type SiteMetadata {
      title: String!
      siteUrl: String!
    }
  `)
  }
