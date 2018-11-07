import React from 'react'
import Link from 'gatsby-link'
import { map, range } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import { format } from 'date-fns'

import Meta from '../components/meta'
import Layout from '../components/base-layout'
import { rhythm } from '../utils/typography'

const PostItem = styled(Link)`
  display: block;
  font-size: ${rhythm(1)};
  text-decoration: none;
  color: ${props => props.theme.black};
  margin: -${rhythm(1 / 2)};
  padding: ${rhythm(1 / 2)};
  transition: 0.3s;
  line-height: 100%;
  font-weight: 200;

  :hover {
    background-color: ${props => rgba(props.theme.blue, 0.1)};
    color: ${props => props.theme.blue};
    text-decoration: none;
  }
`

const Time = styled.time`
  font-size: ${rhythm(0.5)};
  margin-left: ${rhythm(0.5)};
  color: ${props => props.theme.grey};
  font-weight: initial;
`

const Pagination = styled.div`
  margin-top: ${rhythm(0.5)};
  padding-top: ${rhythm(0.5)};
  position: sticky;
  bottom: 0;
  background: #fff;
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
      <Layout>
        <div>
          {map(items, p => (
            <div key={p.id}>
              <PostItem to={p.node.fields.slug}>
                {p.node.frontmatter.title}
                <Time dateTime={p.node.frontmatter.publish_date}>
                  {format(p.node.frontmatter.publish_date, 'YYYY-MM-DD')}
                </Time>
              </PostItem>
            </div>
          ))}
        </div>
        <Paginator pages={pages} page={page} neighbour={3} />
        <Meta />
      </Layout>
    )
  }
}
