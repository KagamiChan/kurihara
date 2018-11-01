import styled from 'styled-components'
import { rgba } from 'polished'
import { rhythm } from '../utils/typography'

export const Article = styled.article``

export const Content = styled.div`
  color: ${props => props.theme.black};

  a:not(.gatsby-resp-image-link) {
    text-decoration: none;
    color: ${props => props.theme.blue};
    transition: 0.3s;

    :hover {
      color: ${props => props.theme.blue};
      background-color: ${props => rgba(props.theme.blue, 0.1)};
    }
  }
`

export const Title = styled.h1`
  font-size: ${rhythm(2)};
  line-height: ${rhythm(2)};
`
