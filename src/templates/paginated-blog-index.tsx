import { FunctionComponent } from 'react'
import { Link } from 'gatsby-link'
import { map, range } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Meta } from '../components/meta'
import { BaseLayout } from '../components/base-layout'
import { PostItem } from '../components/post-item'

import { CreatePagesQuery } from '../../types/graphql-types'

const Pagination = styled.div`
  ${tw`flex flex-wrap items-center mt-4 mb-4`}
`

const PageLink = styled(Link)<{ active: boolean }>`
  ${tw`p-2 text-blue-500 duration-100`}

  ${(props) => props.active && tw`border border-blue-500`}

  :hover {
    ${(props) => !props.active && tw`bg-blue-100`}
  }
`

const Ellipsis = styled.span`
  ${tw`pl-4 pr-4`}
`

interface PaginatorProps {
  pages: number
  page: number
  neighbour: number
}

const Paginator: FunctionComponent<PaginatorProps> = ({
  pages,
  page,
  neighbour,
}) => (
  <Pagination>
    <PageLink active={page === 1} to="/blog">
      1
    </PageLink>
    {page > neighbour + 1 && <Ellipsis>…</Ellipsis>}
    {map(
      range(Math.max(page - neighbour, 2), Math.min(page + neighbour, pages)),
      (p) => (
        <PageLink key={p} active={page === p} to={`/blog/page/${p}`}>
          {p}
        </PageLink>
      ),
    )}
    {page < pages - neighbour && <Ellipsis>…</Ellipsis>}
    {pages > 1 && (
      <PageLink active={page === pages} to={`/blog/page/${pages}`}>
        {pages}
      </PageLink>
    )}
  </Pagination>
)

Paginator.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  neighbour: PropTypes.number.isRequired,
}

interface Props {
  pageContext: {
    items: CreatePagesQuery['allMarkdownRemark']['edges']
    page: number
    pages: number
  }
}

const BlogPaginated: FunctionComponent<Props> = ({
  pageContext: { items, page, pages },
}) => (
  <BaseLayout>
    <div>
      {map(items, (p) => (
        <PostItem key={p.node.id} post={p} />
      ))}
    </div>
    <Paginator pages={pages} page={page} neighbour={3} />
    <hr />
    <Meta />
  </BaseLayout>
)

export default BlogPaginated
