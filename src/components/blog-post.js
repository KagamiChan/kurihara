/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
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

const Timestamp = styled.div`
  color: ${props => props.theme.grey};
  margin-bottom: ${rhythm(1)};
  font-weight: 200;
`

const Title = styled.h1`
  font-size: ${rhythm(2)};
  line-height: ${rhythm(2)};
`

class BlogPostTemplate extends Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { data } = this.props
    const { markdownRemark: post } = data

    const publishDate = new Date(post.frontmatter.publish_date)

    const reviseDate = new Date(post.frontmatter.revise_date)

    return (
      <Layout>
        <Article>
          <Title>{post.frontmatter.title}</Title>
          <Content>
            <Timestamp>
              发布于{' '}
              <time dateTime={post.frontmatter.publish_date}>
                {format(publishDate, 'YYYY-MM-DD')}
              </time>
              {Boolean(post.frontmatter.revise_date) &&
                +reviseDate > +publishDate && (
                  <>
                    {' | '}
                    最后修订于{' '}
                    <time dateTime={post.frontmatter.revise_date}>
                      {format(reviseDate, 'YYYY-MM-DD')}
                    </time>
                  </>
                )}
            </Timestamp>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </Content>
        </Article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
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
        publish_date
        revise_date
      }
    }
  }
`
