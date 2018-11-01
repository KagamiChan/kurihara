/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'

import Layout from './base-layout'
import { rhythm } from '../utils/typography'

const Article = styled.article``

const Content = styled.div`
  color: ${props => props.theme.black};

  a:not(.gatsby-resp-image-link) {
    text-decoration: none;
    color: ${props => props.theme.blue};

    :hover {
      color: ${props => props.theme.blue};
      background-color: ${props => rgba(props.theme.blue, 0.1)};
    }
  }
`

const Title = styled.h1`
  font-size: ${rhythm(2)};
  line-height: ${rhythm(2)};
`

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
