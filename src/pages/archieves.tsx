import { FC, useState, useEffect, MouseEventHandler, memo } from 'react'
import { graphql } from 'gatsby'
import { map, max, min, range, groupBy, entries, uniq, isEqual } from 'lodash'
import fp from 'lodash/fp'
import styled from 'styled-components'
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
import tw from 'twin.macro'

import { SiteTitle } from '../components/site-title'
import { Meta } from '../components/meta'
import { BaseLayout } from '../components/base-layout'
import { PostItem } from '../components/post-item'
import { withKeyboardA11y } from '../utils/with-keyboard-a11y'

import { ArchiveQuery } from '../../types/graphql-types'

const Years = styled.div`
  ${tw`flex flex-wrap mb-4`}
`

const Year = withKeyboardA11y(styled.a<{ active: boolean }>`
  ${tw`p-2 text-blue-500 duration-100 cursor-pointer`}

  ${(props) => props.active && tw`border border-blue-500`}

  :hover {
    ${(props) => !props.active && tw`bg-blue-100`}
  }
`)

const DayCell = withKeyboardA11y(styled.rect<{
  active: boolean
  month: number
  selected: boolean
}>`
  ${tw`duration-100`}
  ${(props) => (props.month % 2 ? tw`text-gray-200` : tw`text-gray-300`)};
  ${(props) => props.active && tw`text-green-500 cursor-pointer`}
  ${(props) => props.selected && tw`text-orange-500`};
  fill: currentColor;
`)

const List = styled.div`
  ${tw`mt-8 mb-4`}
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
                  tabIndex={activeDays.includes(+day) ? 0 : undefined}
                  role={activeDays.includes(+day) ? 'button' : undefined}
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

const MemoDaysMatrix = memo(DaysMatrix, isEqual)

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
                tabIndex={0}
                role="button"
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
      sort: [{ frontmatter: { publish_date: DESC } }]
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
