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
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
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
              allMarkdownRemark.edges.map(edge => ({
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
              {
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
            output: '/feed.xml',
            title: 'RSS Feed',
          },
        ],
      },
    },
    'gatsby-plugin-netlify',
  ],
}
