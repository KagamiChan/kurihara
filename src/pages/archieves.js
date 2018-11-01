import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { map, max, min, range, groupBy, entries } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import {
  format,
  getYear,
  eachDay,
  getDay,
  differenceInCalendarWeeks,
  endOfYear,
  startOfWeek,
} from 'date-fns'

import Layout from '../components/base-layout'
import { rhythm } from '../utils/typography'

const Years = styled.div`
  display: flex;
`

const Year = styled.div`
  line-height: ${rhythm(1)};
  padding: 0 ${rhythm(0.25)};
`

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

const DaysMatrix = ({ year }) => {
  const firstDay = new Date(year, 0, 1)
  const daysOfYear = eachDay(firstDay, endOfYear(firstDay))
  const weeks = groupBy(
    daysOfYear,
    day => +startOfWeek(day, { weekStartsOn: 1 }),
  )

  return (
    <svg viewBox="0 0 530 70">
      <g>
        {map(entries(weeks), ([week, days]) => (
          <g
            key={week}
            date={week}
            transform={`translate(${10 *
              differenceInCalendarWeeks(+week, firstDay, {
                weekStartsOn: 1,
              })}, 0)`}
          >
            {map(days, day => (
              <rect
                key={day}
                width={8}
                height={8}
                fill="#eee"
                date={+day}
                transform={`translate(0, ${10 * ((getDay(day) + 6) % 7)})`}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}

DaysMatrix.propTypes = {
  year: PropTypes.number.isRequired,
}

export default class BlogIndex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { data } = this.props

    const {
      allMarkdownRemark: { edges: posts },
    } = data

    const startTime = min(map(posts, 'node.frontmatter.publish_date'))
    const endTime = max(map(posts, 'node.frontmatter.publish_date'))

    const startYear = getYear(new Date(startTime))
    const endYear = getYear(new Date(endTime))

    return (
      <Layout>
        <Years>
          {map(range(startYear, endYear + 1), y => (
            <Year>{y}</Year>
          ))}
        </Years>
        <DaysMatrix year={2017} />
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

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___publish_date], order: DESC }
      filter: { fields: { type: { eq: "blog" } } }
    ) {
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
