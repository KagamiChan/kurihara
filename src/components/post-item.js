import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rgba } from 'polished'
import { format } from 'date-fns'
import { withTranslation } from 'react-i18next'

import { rhythm } from '../utils/typography'

const Item = styled(Link)`
  display: block;
  font-size: ${rhythm(0.75)};
  text-decoration: none;
  color: ${props => props.theme.black};
  margin: 0 -${rhythm(1 / 2)};
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

const Property = styled.span`
  font-size: ${rhythm(0.5)};
  color: ${props => props.theme.grey};
  font-weight: initial;
`

const PostItem = withTranslation(['ui'])(({ post, t }) => (
  <Item to={post.node.fields.slug}>
    <div>{post.node.frontmatter.title}</div>
    <Property>
      <time dateTime={post.node.frontmatter.publish_date}>
        {format(post.node.frontmatter.publish_date, 'YYYY-MM-DD')}
      </time>
      <span> • </span>
      <span>
        {t('{{minutes}} min', {
          minutes: post.node.fields.timeToRead.minutes,
        })}
      </span>
    </Property>
  </Item>
))

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    node: PropTypes.object,
  }).isRequired,
}

export default PostItem
