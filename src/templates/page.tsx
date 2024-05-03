/* eslint-disable react/no-danger */

import { FunctionComponent } from 'react'
import { graphql } from 'gatsby'

import { Article, Content, Title } from '../components/common'
import { BaseLayout } from '../components/base-layout'
import { Meta } from '../components/meta'

interface Props {
  data: Queries.PageBySlugQuery
}

const PageTemplate: FunctionComponent<Props> = ({
  data: { markdownRemark: post },
}) => (
  <BaseLayout>
    <Article>
      <Title>{post?.frontmatter?.title}</Title>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post?.html || '' }} />
      </Content>
    </Article>
    <hr />
    <Meta />
  </BaseLayout>
)

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
