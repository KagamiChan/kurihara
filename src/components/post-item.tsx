import { FC } from 'react'
import { Link } from 'gatsby-link'
import styled from 'styled-components'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import tw from 'twin.macro'

import { CreatePagesQuery } from '../../types/graphql-types'

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
  post: NonNullable<CreatePagesQuery['allMarkdownRemark']['edges'][number]>
}

export const PostItem: FC<Props> = ({ post }) => {
  const { t } = useTranslation()
  return (
    <Item to={post.node.fields?.slug || ''}>
      <span>{post.node.frontmatter?.title}</span>
      <Property>
        <time dateTime={post.node.frontmatter?.publish_date}>
          {format(new Date(post.node.frontmatter?.publish_date), 'yyyy-MM-dd')}
        </time>
        <span> • </span>
        <span>
          {t('{{minutes}} min', {
            minutes: post.node.fields?.timeToRead?.minutes,
          })}
        </span>
      </Property>
    </Item>
  )
}
