/* eslint-disable no-unused-expressions */

// This file to for generating typings for queries used in config

import { graphql } from 'gatsby'

export {}

if (require.main === module) {
  graphql`
    query FeedMeta {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `

  graphql`
    query FeedContent {
      allMarkdownRemark(
        limit: 20
        sort: [{ frontmatter: { publish_date: DESC } }]
        filter: {
          frontmatter: { draft: { ne: true } }
          fields: { type: { eq: "blog" } }
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
  `
}
