/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Article, Content, Title } from '../components/common'
import Layout from '../components/base-layout'
import Meta from '../components/meta'

class PageTemplate extends Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { data } = this.props
    const { markdownRemark: post } = data

    return (
      <Layout>
        <Article>
          <Title>{post.frontmatter.title}</Title>
          <Content>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </Content>
        </Article>
        <Meta />
      </Layout>
    )
  }
}

export default PageTemplate

export const query = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
      }
    }
  }
`
