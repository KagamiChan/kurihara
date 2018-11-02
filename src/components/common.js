import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { rhythm } from '../utils/typography'
import { media } from '../utils/style'

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

export const commonMargin = css`
  margin: 0 0 0 ${rhythm(4)};
  ${media.desktop`margin-left: ${rhythm(2)};`} ${media.tablet`margin-left: 0;`};
`

export const FooterWrapper = styled.div`
  font-size: ${rhythm(0.5)};
  padding: ${rhythm(0.5)};
  margin: ${rhythm(1)};

  a {
    text-decoration: none;
    color: inherit;
    transition: 0.3s;
  }
`
