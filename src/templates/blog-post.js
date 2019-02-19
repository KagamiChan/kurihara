/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
import { withTranslation } from 'react-i18next'

import SiteTitle from '../components/site-title'
import Hitokoto from '../components/hitokoto'
import Meta from '../components/meta'
import { Article, Content, Title } from '../components/common'
import Layout from '../components/base-layout'
import { rhythm } from '../utils/typography'

const Timestamp = styled.div`
  color: ${props => props.theme.grey};
  margin-bottom: ${rhythm(1)};
  font-weight: 200;
`

@withTranslation(['ui'])
class BlogPostTemplate extends Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.object,
    }).isRequired,
    t: PropTypes.func.isRequired,
  }

  render() {
    const { data, t } = this.props
    const { markdownRemark: post } = data

    const publishDate = new Date(post.frontmatter.publish_date)

    const reviseDate = new Date(post.frontmatter.revise_date)

    return (
      <Layout>
        <SiteTitle suffix={post.frontmatter.title} />

        <Article>
          <Title>{post.frontmatter.title}</Title>
          <Content>
            <Timestamp>
              {t('Posted')}{' '}
              <time dateTime={post.frontmatter.publish_date}>
                {format(publishDate, 'YYYY-MM-DD')}
              </time>
              {Boolean(post.frontmatter.revise_date) &&
                +reviseDate > +publishDate && (
                  <>
                    {' | '}
                    {t('Last revised')}{' '}
                    <time dateTime={post.frontmatter.revise_date}>
                      {format(reviseDate, 'YYYY-MM-DD')}
                    </time>
                  </>
                )}
            </Timestamp>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </Content>
        </Article>
        <hr />
        <Hitokoto />
        <Meta />
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
