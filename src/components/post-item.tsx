import { FC } from 'react'
import { Link } from 'gatsby-link'
import styled from 'styled-components'
import { format } from 'date-fns'
import tw from 'twin.macro'

const Item = styled(Link)`
  ${tw`block text-2xl text-blue-500 duration-100 mb-4`}

  :hover {
    ${tw`bg-blue-100`}
  }
`

const Property = styled.span`
  ${tw`text-base text-gray-400 pl-4`}
`

export interface Props {
  post: NonNullable<
    Queries.CreatePagesQuery['allMarkdownRemark']['edges'][number]
  >
}

export const PostItem: FC<Props> = ({ post }) => (
  <Item to={post.node.fields?.slug || ''}>
    <span>{post.node.frontmatter?.title}</span>
    <Property>
      <time dateTime={post.node.frontmatter?.publish_date ?? ''}>
        {format(
          new Date(post.node.frontmatter?.publish_date ?? 0),
          'yyyy-MM-dd',
        )}
      </time>
      <span> • </span>
      <span>{post.node.fields?.timeToRead?.minutes}分钟</span>
    </Property>
  </Item>
)
