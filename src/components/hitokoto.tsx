import React, { useMemo, FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { get, size } from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'

import { FooterWrapper } from './common'
import { rhythm } from '../utils/typography'
import { HitokotoQuery } from '../../types/graphql-types'

const Wrapper = styled(FooterWrapper)``

const Content = styled.div`
  font-weight: 400;
  white-space: pre-wrap;
`

const Footer = styled.div`
  margin-top: ${rhythm(0.5)};
  text-align: right;
`

const Source = styled.span``

export const Hitokoto: FunctionComponent<{}> = () => {
  const order = useMemo(() => Math.random(), [])

  const data = useStaticQuery<HitokotoQuery>(graphql`
    query Hitokoto {
      allHitokotoYaml {
        edges {
          node {
            author
            id
            content
            source
            link
          }
        }
      }
    }
  `)

  const index = Math.floor(order * size(data.allHitokotoYaml.edges))
  const entry = get(data, ['allHitokotoYaml', 'edges', index, 'node'])
  return (
    <Wrapper>
      <Content>{entry.content}</Content>
      <Footer>
        —— {entry?.author?.join(' / ')} - <Source>{entry.source}</Source>{' '}
        {entry.link && (
          <a href={entry.link}>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        )}
      </Footer>
    </Wrapper>
  )
}
