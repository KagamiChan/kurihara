import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

import { theme } from '../utils/style'
import blogLogo from '../assets/blog-logo.png'

const HeaderWrap = styled.div`
  background: white;
  margin-bottom: ${rhythm(1)};
`

const Header = styled.div`
  margin: 0 0 0 10%;
  max-width: 960px;
  padding: ${rhythm(1)} 0;
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
  width: ${rhythm(6)};
  height: ${rhythm(3)};
  display: block;
`

const Nav = styled.nav`
  display: block;
  flex: 1;
`

const Content = styled.div`
  margin: 0 0 0 10%;
  max-width: 960px;
  padding: ${rhythm(1)} 0;
  padding-top: 0;
`

const BaseLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
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

BaseLayout.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object,
  }).isRequired,
  children: PropTypes.element.isRequired,
}

export default BaseLayout
