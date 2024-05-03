import { useMemo, FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { get, size } from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import tw from 'twin.macro'

import { FooterWrapper } from './common'

const Wrapper = styled(FooterWrapper)`
  ${tw`flex justify-center mt-32 mb-8`}
`

const Container = styled.div`
  ${tw`bg-gray-100 p-4 text-sm`}
`

const Content = styled.div`
  ${tw`whitespace-pre-wrap`}
`

const Footer = styled.div`
  ${tw`text-right ml-16`}
`

const Source = styled.span``

export const Hitokoto: FunctionComponent<Record<string, never>> = () => {
  const order = useMemo(() => Math.random(), [])

  const data = useStaticQuery<Queries.HitokotoQuery>(graphql`
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
      <Container>
        <Content>{entry.content}</Content>
        <Footer>
          —— {entry?.author?.join(' / ')} - <Source>{entry.source}</Source>{' '}
          {entry.link && (
            <a href={entry.link} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          )}
        </Footer>
      </Container>
    </Wrapper>
  )
}
