import React, { FC, useState, useEffect, MouseEventHandler } from 'react'
import { graphql } from 'gatsby'
import { map, max, min, range, groupBy, entries, uniq, isEqual } from 'lodash'
import fp from 'lodash/fp'
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

import { ArchiveQuery } from '../../types/graphql-types'

const Years = styled.div`
  display: flex;
  /* margin-bottom: ${rhythm(1)}; */
  flex-wrap: wrap;
`

const Year = styled.a<{ active: boolean }>`
  /* line-height: ${rhythm(1)}; */
  /* padding: 0 ${rhythm(0.25)}; */
  background: ${(props) => props.active && props.theme.blue};
  color: ${(props) => props.active && '#fff'};
  border: none;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
`

const DayCell = styled.rect<{
  active: boolean
  month: number
  selected: boolean
}>`
  fill: ${(props) => rgba(props.theme.blue, 0.2 - 0.1 * (props.month % 2))};
  fill: ${(props) => props.active && props.theme.green};
  fill: ${(props) => props.selected && props.theme.orange};
  transition: 0.3s;
  cursor: ${(props) => props.active && 'pointer'};
`

const List = styled.div`
  /* margin-top: ${rhythm(1)}; */
`

interface DaysMatrixProps {
  year: number
  activeDays: number[]
  activeDay: number
  onSelectDay: (day: number) => MouseEventHandler
}

const DaysMatrix: FC<DaysMatrixProps> = ({
  year,
  activeDays,
  activeDay,
  onSelectDay,
}) => {
  const firstDay = new Date(year, 0, 1)
  const daysOfYear = eachDayOfInterval({
    start: firstDay,
    end: endOfYear(firstDay),
  })
  const weeks = groupBy(
    daysOfYear,
    (day) => +startOfWeek(day, { weekStartsOn: 1 }),
  )

  return (
    <svg viewBox="0 0 540 70" onClick={onSelectDay(0)}>
      <g>
        {map(entries(weeks), ([week, days]) => (
          <g
            key={week}
            transform={`translate(${
              10 *
              differenceInCalendarWeeks(+week, firstDay, {
                weekStartsOn: 1,
              })
            }, 0)`}
          >
            {map(days, (time) => {
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

const MemoDaysMatrix = React.memo(DaysMatrix, isEqual)

interface Props {
  data: ArchiveQuery
}

type Post = ArchiveQuery['allMarkdownRemark']['edges'][number]

const BlogArchives: FC<Props> = ({ data }) => {
  const [activeYear, setActiveYear] = useState(0)
  const [activeDay, setActiveDay] = useState(0)
  const [init, setInit] = useState(false)

  useEffect(() => {
    const {
      allMarkdownRemark: { edges: posts },
    } = data
    const startTime = min(map(posts, 'node.frontmatter.publish_date'))
    const startYear = getYear(new Date(startTime))

    setActiveYear(startYear)
  }, [data])

  useEffect(() => {
    // Skips SSR because the Calendar is timezone dependent
    if (typeof window !== 'undefined') {
      setInit(true)
    }
  })

  const {
    allMarkdownRemark: { edges: posts },
  } = data

  const startTime = min(map(posts, 'node.frontmatter.publish_date'))
  const endTime = max(map(posts, 'node.frontmatter.publish_date'))

  const startYear = getYear(new Date(startTime))
  const endYear = getYear(new Date(endTime))

  const activeDays = uniq(
    map(posts, (p) => +startOfDay(new Date(p.node.frontmatter?.publish_date))),
  )

  const timezone = new Date().getTimezoneOffset()

  return (
    <BaseLayout>
      <SiteTitle suffix="存档" />
      {init && (
        <>
          <Years>
            {map(range(startYear, endYear + 1), (y) => (
              <Year
                key={y}
                active={y === activeYear}
                onClick={() => {
                  setActiveYear(y)
                  setActiveDay(0)
                }}
              >
                {y}
              </Year>
            ))}
          </Years>
          <MemoDaysMatrix
            year={activeYear}
            activeDays={activeDays}
            activeDay={activeDay}
            onSelectDay={(day) => (e) => {
              e.stopPropagation()
              setActiveDay(activeDay === day ? 0 : day)
            }}
            key={timezone}
          />
        </>
      )}
      <List>
        {fp.flow(
          fp.filter<Post>(
            (p) =>
              getYear(new Date(p.node.frontmatter?.publish_date)) ===
              activeYear,
          ),
          fp.filter<Post>(
            (p) =>
              !activeDay ||
              isSameDay(new Date(p.node.frontmatter?.publish_date), activeDay),
          ),
          fp.map((p) => <PostItem key={p.node.id} post={p} />),
        )(posts)}
      </List>
      <hr />
      <Meta />
    </BaseLayout>
  )
}

export default BlogArchives

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
