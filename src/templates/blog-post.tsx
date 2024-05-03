/* eslint-disable react/no-danger */

import { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { format } from 'date-fns'
import tw from 'twin.macro'

import { SiteTitle } from '../components/site-title'
import { Hitokoto } from '../components/hitokoto'
import { Meta } from '../components/meta'
import { Article, Content, Title } from '../components/common'
import { BaseLayout } from '../components/base-layout'

const Timestamp = styled.div`
  ${tw`text-gray-500 text-lg mb-4`}
`

const Notice = styled.div`
  ${tw`text-orange-500`}
`

interface Props {
  data: Queries.BlogPostBySlugQuery
}

const BlogPostTemplate: FunctionComponent<Props> = ({ data }) => {
  const { markdownRemark: post } = data

  const publishDate = new Date(post?.frontmatter?.publish_date ?? 0)

  const reviseDate = new Date(post?.frontmatter?.revise_date ?? 0)

  return (
    <BaseLayout>
      <SiteTitle suffix={post?.frontmatter?.title} />

      <Article>
        <Title id="post-title">{post?.frontmatter?.title}</Title>
        <Content>
          <Timestamp>
            发布于
            <time dateTime={post?.frontmatter?.publish_date ?? ''}>
              {format(new Date(publishDate), 'yyyy-MM-dd')}
            </time>
            {Boolean(post?.frontmatter?.revise_date) &&
              +reviseDate > +publishDate && (
                <>
                  | 最后修订于
                  <time dateTime={post?.frontmatter?.revise_date ?? ''}>
                    {format(new Date(reviseDate), 'yyyy-MM-dd')}
                  </time>
                </>
              )}
            {!!post?.frontmatter?.draft && <Notice>这篇文章还是草稿</Notice>}
          </Timestamp>
          <div dangerouslySetInnerHTML={{ __html: post?.html || '' }} />
        </Content>
      </Article>
      <Hitokoto />
      <Meta />
    </BaseLayout>
  )
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
        draft
      }
    }
  }
`
