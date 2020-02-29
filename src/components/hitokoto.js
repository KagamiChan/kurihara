import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { get, size } from 'lodash'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'

import { FooterWrapper } from './common'
import { rhythm } from '../utils/typography'

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

class Hitokoto extends Component {
  state = {
    order: 0,
  }

  componentDidMount = () => {
    this.setState({
      order: Math.random(),
    })
  }

  render() {
    const { order } = this.state
    return (
      <StaticQuery
        query={graphql`
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
        `}
        render={data => {
          const index = Math.floor(order * size(data.allHitokotoYaml.edges))
          const entry = get(data, ['allHitokotoYaml', 'edges', index, 'node'])
          return (
            <Wrapper>
              <Content>{entry.content}</Content>
              <Footer>
                —— {entry.author.join(' / ')} - <Source>{entry.source}</Source>{' '}
                {entry.link && (
                  <a href={entry.link}>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                )}
              </Footer>
            </Wrapper>
          )
        }}
      />
    )
  }
}

export default Hitokoto
