import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

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
  margin: 0 0 0 ${rhythm(4)};
  max-width: 960px;
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
  display: block;
  flex: 1;
`

const Content = styled.div`
  margin: 0 0 0 ${rhythm(4)};
  max-width: 800px;
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
              <H1>
                <H1Link to="/blog">明镜止水</H1Link>
              </H1>
              <Nav />
            </Header>
          </HeaderWrap>
          <Content>{children}</Content>
        </div>
      </ThemeProvider>
    )
  }
}

export default BaseLayout
