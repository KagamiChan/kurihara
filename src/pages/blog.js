import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { map } from 'lodash'
import PropTypes from 'prop-types'

import Layout from '../components/base-layout'

export default class BlogIndex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { data } = this.props

    const {
      allMarkdownRemark: { edges: posts },
    } = data

    return (
      <Layout>
        {map(posts, p => (
          <div key={p.id}>
            <Link to={p.node.fields.slug}>{p.node.frontmatter.title}</Link>
          </div>
        ))}
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___publish_date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
