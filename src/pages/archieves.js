import React, { Component } from 'react'
import { graphql } from 'gatsby'
import {
  map,
  max,
  min,
  range,
  groupBy,
  entries,
  uniq,
  memoize,
  isEqual,
} from 'lodash'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import {
  format,
  getYear,
  eachDayOfInterval,
  getDay,
  differenceInCalendarWeeks,
  endOfYear,
  startOfWeek,
  startOfDay,
  isSameDay,
  getMonth,
} from 'date-fns'

import { SiteTitle } from '../components/site-title'
import { Meta } from '../components/meta'
import { BaseLayout } from '../components/base-layout'
import { PostItem } from '../components/post-item'
import { rhythm } from '../utils/typography'

const Years = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1)};
  flex-wrap: wrap;
`

const Year = styled.a`
  line-height: ${rhythm(1)};
  padding: 0 ${rhythm(0.25)};
  background: ${props => props.active && props.theme.blue};
  color: ${props => props.active && '#fff'};
  border: none;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
`

const DayCell = styled.rect`
  fill: ${props => rgba(props.theme.blue, 0.2 - 0.1 * (props.month % 2))};
  fill: ${props => props.active && props.theme.green};
  fill: ${props => props.selected && props.theme.orange};
  transition: 0.3s;
  cursor: ${props => props.active && 'pointer'};
`

const List = styled.div`
  margin-top: ${rhythm(1)};
`

const DaysMatrix = ({ year, activeDays, activeDay, onSelectDay }) => {
  const firstDay = new Date(year, 0, 1)
  const daysOfYear = eachDayOfInterval({
    start: firstDay,
    end: endOfYear(firstDay),
  })
  const weeks = groupBy(
    daysOfYear,
    day => +startOfWeek(day, { weekStartsOn: 1 }),
  )

  return (
    <svg viewBox="0 0 540 70" onClick={onSelectDay(0)}>
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
            {map(days, time => {
              const day = new Date(time)
              return (
                <DayCell
                  key={+day}
                  width={8}
                  height={8}
                  active={activeDays.includes(+day)}
                  selected={activeDay === +day}
                  onClick={
                    activeDays.includes(+day) ? onSelectDay(+day) : undefined
                  }
                  date={+day}
                  month={getMonth(day)}
                  transform={`translate(0, ${10 * ((getDay(day) + 6) % 7)})`}
                >
                  <title>{format(day, 'yyyy-MM-dd')}</title>
                </DayCell>
              )
            })}
          </g>
        ))}
      </g>
    </svg>
  )
}

DaysMatrix.propTypes = {
  year: PropTypes.number.isRequired,
  activeDays: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeDay: PropTypes.number.isRequired,
  onSelectDay: PropTypes.func.isRequired,
}

const MemoDaysMatrix = React.memo(DaysMatrix, isEqual)

export default class BlogArchives extends Component {
  state = {
    activeYear: 0,
    activeDay: 0,
    init: false,
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.activeYear === 0) {
      const { data } = nextProps
      const {
        allMarkdownRemark: { edges: posts },
      } = data
      const startTime = min(map(posts, 'node.frontmatter.publish_date'))
      const startYear = getYear(new Date(startTime))

      return {
        activeYear: startYear,
      }
    }

    return null
  }

  handleSelectYear = memoize(y => () => {
    this.setState({
      activeYear: y,
      activeDay: 0,
    })
  })

  handleActiveDay = memoize(day => e => {
    e.stopPropagation()
    this.setState(state => ({
      activeDay: state.activeDay === day ? 0 : day,
    }))
  })

  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.object,
    }).isRequired,
  }

  componentDidMount = () => {
    this.setState({
      init: true,
    })
  }

  render() {
    const { data } = this.props
    const { activeYear, activeDay, init } = this.state

    const {
      allMarkdownRemark: { edges: posts },
    } = data

    const startTime = min(map(posts, 'node.frontmatter.publish_date'))
    const endTime = max(map(posts, 'node.frontmatter.publish_date'))

    const startYear = getYear(new Date(startTime))
    const endYear = getYear(new Date(endTime))

    const activeDays = uniq(
      map(posts, p => +startOfDay(new Date(p.node.frontmatter.publish_date))),
    )

    const timezone = new Date().getTimezoneOffset()

    return (
      <BaseLayout>
        <SiteTitle suffix="存档" />
        {init && (
          <>
            <Years>
              {map(range(startYear, endYear + 1), y => (
                <Year
                  key={y}
                  active={y === activeYear}
                  onClick={this.handleSelectYear(y)}
                >
                  {y}
                </Year>
              ))}
            </Years>
            <MemoDaysMatrix
              year={activeYear}
              activeDays={activeDays}
              activeDay={activeDay}
              onSelectDay={this.handleActiveDay}
              timezone={timezone}
            />
          </>
        )}
        <List>
          {fp.flow(
            fp.filter(
              p =>
                getYear(new Date(p.node.frontmatter.publish_date)) ===
                activeYear,
            ),
            fp.filter(
              p =>
                !activeDay ||
                isSameDay(new Date(p.node.frontmatter.publish_date), activeDay),
            ),
            fp.map(p => <PostItem key={p.node.id} post={p} />),
          )(posts)}
        </List>
        <hr />
        <Meta />
      </BaseLayout>
    )
  }
}

export const query = graphql`
  query Archive {
    allMarkdownRemark(
      sort: { fields: [frontmatter___publish_date], order: DESC }
      filter: { fields: { type: { eq: "blog" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            timeToRead {
              words
              minutes
            }
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
