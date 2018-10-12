import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { map } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import { format } from 'date-fns'

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

export default class BlogIndex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allMdx: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { data } = this.props

    const {
      allMdx: { edges: posts },
    } = data

    return (
      <Layout>
        {map(posts, p => (
          <div key={p.id}>
            <PostItem to={p.node.fields.slug}>
              {p.node.frontmatter.title}
              <Time dateTime={p.node.frontmatter.publish_date}>
                {format(p.node.frontmatter.publish_date, 'YYYY-MM-DD')}
              </Time>
            </PostItem>
          </div>
        ))}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___publish_date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            publish_date
          }
        }
      }
    }
  }
`
