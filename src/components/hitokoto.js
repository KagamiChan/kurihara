import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { get, size, sample } from 'lodash'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'

import { rhythm } from '../utils/typography'

const Wrapper = styled.div`
  ${props => {
    const color = props.theme[sample(['blue', 'green', 'orange', 'pink'])]
    return css`
      background: ${rgba(color, 0.1)};
      color: ${color};
    `
  }}
  font-size: ${rhythm(0.5)};
  padding: ${rhythm(0.5)};
  margin: ${rhythm(1)};

  a {
    text-decoration: none;
    color: inherit;
  }
`

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
          query {
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
                {entry.author.join(' / ')} - <Source>{entry.source}</Source>{' '}
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
