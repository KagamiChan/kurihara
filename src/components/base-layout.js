import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { rgba } from 'polished'

import { commonMargin } from './common'
import { rhythm } from '../utils/typography'
import { theme } from '../utils/style'
import blogLogo from '../assets/blog-logo.png'
import 'prismjs/themes/prism.css'

const GlobalStyle = createGlobalStyle`
  @import url(//fonts.googleapis.com/css?family=Open+Sans:300);
  @import url(//fonts.googleapis.com/earlyaccess/notosansscsliced.css);
`

const HeaderWrap = styled.div`
  background: white;
  margin-bottom: ${rhythm(1)};
`

const Header = styled.div`
  ${commonMargin} max-width: 960px;
  padding: ${rhythm(1 / 3)} 0;
  display: flex;
  align-items: center;
`

const H1 = styled.h1`
  margin: 0;
  display: block;
`

const H1Link = styled(Link)`
  text-decoration: none;
  background: url(${blogLogo});
  background-repeat: no-repeat;
  background-size: contain;
  text-indent: -999px;
  overflow: hidden;
  width: ${rhythm(4)};
  height: ${rhythm(2)};
  display: block;
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
`

const NavItem = styled(Link)`
  margin-left: ${rhythm(1)};
  text-decoration: none;
  color: ${props => props.theme.black};
  transition: 0.3s;
  line-height: ${rhythm(1)};
  display: block;
  position: relative;

  ::after {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.blue};
    position: absolute;
    left: 0;
    bottom: 0;
    display: inline-block;
    content: '';
    transition: 0.3s;
    opacity: 0;
  }

  :hover {
    color: ${props => props.theme.blue};

    ::after {
      opacity: 1;
    }
  }
`

const Content = styled.div`
  ${commonMargin} max-width: 800px;
  padding: ${rhythm(1)} 0;
  padding-top: 0;
`

const Sentinel = styled.div`
  position: absolute;
  top: ${rhythm(4)};
  left: 0;
`

const Shortcut = styled.a`
  border-radius: ${rhythm(0.5)};
  height: ${rhythm(1)};
  min-width: ${rhythm(1)};
  transition: 0.3s;
  background-color: ${props => rgba(props.theme.blue, 0.75)};
  position: fixed;
  left: ${rhythm(0.5)};
  bottom: ${rhythm(1)};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.visible ? 1 : 0)};
  text-decoration: none;

  :hover {
    background-color: ${props => rgba(props.theme.blue, 1)};
  }

  svg {
    width: 0.875em;
  }
`

class BaseLayout extends Component {
  static propTypes = {
    data: PropTypes.shape({
      site: PropTypes.object,
    }).isRequired,
    children: PropTypes.element.isRequired,
  }

  sentinel = React.createRef()

  state = {
    shortcutVisible: false,
  }

  componentDidMount = async () => {
    await import('intersection-observer')
    this.observer = new IntersectionObserver(this.handleIntersect)
    if (this.sentinel.current) {
      this.observer.observe(this.sentinel.current)
    }
  }

  componentWillUnmount = () => {
    this.observer.disconnect()
  }

  handleIntersect = ([{ isIntersecting }]) => {
    const { shortcutVisible } = this.state
    if (shortcutVisible !== !isIntersecting) {
      this.setState({
        shortcutVisible: !isIntersecting,
      })
    }
  }

  render() {
    const { children } = this.props
    const { shortcutVisible } = this.state
    return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyle />
          <StaticQuery
            query={graphql`
              query LayoutQuery {
                site {
                  siteMetadata {
                    title
                  }
                }
              }
            `}
            render={data => (
              <Helmet>
                <title>{data.site.siteMetadata.title}</title>
                <meta name="description" content="明镜止水的个人日志" />
                <meta name="keywords" content="明镜止水, HP, BLOG" />
                <script
                  src="//fonts.gstatic.com/ea/timing/v1/mlfont.js"
                  async
                />
              </Helmet>
            )}
          />
          <Sentinel ref={this.sentinel} />
          <HeaderWrap>
            <Header>
              <H1 id="blog-title">
                <H1Link to="/blog">明镜止水</H1Link>
              </H1>
              <Nav>
                <NavItem>
                  <ruby>
                    存档
                    <rp>(</rp>
                    <rt>Archives</rt>
                    <rp>)</rp>
                  </ruby>
                </NavItem>
                <NavItem>
                  <ruby>
                    清单
                    <rp>(</rp>
                    <rt>List</rt>
                    <rp>)</rp>
                  </ruby>
                </NavItem>
                <NavItem to="/about">
                  <ruby>
                    关于
                    <rp>(</rp>
                    <rt>About</rt>
                    <rp>)</rp>
                  </ruby>
                </NavItem>
              </Nav>
            </Header>
          </HeaderWrap>
          <Content>{children}</Content>
          <Shortcut
            visible={shortcutVisible}
            href="#blog-title"
            title="回到顶部"
          >
            <svg
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              />
            </svg>
          </Shortcut>
        </div>
      </ThemeProvider>
    )
  }
}

export default BaseLayout
