/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */

const path = require('path')

module.exports = {
  siteMetadata: {
    title: '少年读书隙中窥月',
    description: '明镜止水的个人日志',
    siteUrl: 'https://kagami.moe',
  },
  plugins: [
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.resolve(__dirname, './content'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.resolve(__dirname, './data'),
      },
    },
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        codegen: process.env.NODE_ENV !== 'development',
        fileName: 'types/graphql-types.ts',
        documentPaths: [
          './src/**/*.{ts,tsx,js}',
          './gatsby/**/*.{ts,tsx,js}',
          './.cache/fragments/*.js',
          './node_modules/gatsby-*/**/*.js',
        ],
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-128304723-1',
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          query FeedMeta {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [
                  {
                    'content:encoded': edge.node.html,
                  },
                ],
              })),
            query: `
              query FeedContent {
                allMarkdownRemark(
                  limit: 20,
                  sort: { order: DESC, fields: [frontmatter___publish_date] },
                  filter: {
                    frontmatter: {
                      draft: { ne: true }
                    },
                    fields: {
                      type: {eq: "blog"}
                    }
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date: publish_date(formatString: "")
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'RSS Feed',
          },
        ],
      },
    },
    'gatsby-plugin-netlify',
  ],
}
