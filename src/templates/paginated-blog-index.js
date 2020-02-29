import React from 'react'
import Link from 'gatsby-link'
import { map, range } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'

import { Meta } from '../components/meta'
import { BaseLayout } from '../components/base-layout'
import { PostItem } from '../components/post-item'
import { rhythm } from '../utils/typography'

const Pagination = styled.div`
  margin: ${rhythm(0.5)} 0;
  padding-top: ${rhythm(0.5)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const PageLink = styled(Link)`
  padding: 0 ${rhythm(0.5)};
  text-decoration: none;
  background: ${props => props.active && props.theme.blue};
  color: ${props => props.theme.black};
  color: ${props => props.active && '#fff'};
  transition: 0.3s;

  :hover {
    background-color: ${props => !props.active && rgba(props.theme.blue, 0.1)};
    color: ${props => !props.active && props.theme.blue};
    text-decoration: none;
  }
`

const Ellipsis = styled.div`
  padding: 0 ${rhythm(0.5)};
`

const Paginator = ({ pages, page, neighbour }) => (
  <Pagination>
    <PageLink active={page === 1} to="/blog">
      1
    </PageLink>
    {page > neighbour + 1 && <Ellipsis>…</Ellipsis>}
    {map(
      range(Math.max(page - neighbour, 2), Math.min(page + neighbour, pages)),
      p => (
        <PageLink active={page === p} to={`/blog/page/${p}`}>
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

export default class BlogPaginated extends React.Component {
  static propTypes = {
    pageContext: PropTypes.shape({
      items: PropTypes.array,
      page: PropTypes.number,
      pages: PropTypes.number,
    }).isRequired,
  }

  render() {
    const { pageContext } = this.props

    const { items, page, pages } = pageContext

    return (
      <BaseLayout>
        <div>
          {map(items, p => (
            <PostItem key={p.id} post={p} />
          ))}
        </div>
        <Paginator pages={pages} page={page} neighbour={3} />
        <hr />
        <Meta />
      </BaseLayout>
    )
  }
}
