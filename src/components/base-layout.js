import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Shortcut from './shortcut'
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

class BaseLayout extends Component {
  static propTypes = {
    data: PropTypes.shape({
      site: PropTypes.object,
    }).isRequired,
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props
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
          <Shortcut />
        </div>
      </ThemeProvider>
    )
  }
}

export default BaseLayout
