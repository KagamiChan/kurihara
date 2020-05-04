import React, { FC } from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { I18nextProvider, withTranslation } from 'react-i18next'
import i18n from '../i18n'

import '../lib/typekit'
import { SiteTitle } from './site-title'
import { Shortcut } from './shortcut'
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
  color: ${(props) => props.theme.black};
  transition: 0.3s;
  line-height: ${rhythm(1)};
  display: block;
  position: relative;

  ::after {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.blue};
    position: absolute;
    left: 0;
    bottom: 0;
    display: inline-block;
    content: '';
    transition: 0.3s;
    opacity: 0;
  }

  :hover {
    color: ${(props) => props.theme.blue};

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

const Navigation = withTranslation(['ui'])(({ t }) => (
  <Nav>
    <NavItem to="/archieves">{t('Archives')}</NavItem>
    <NavItem to="./">{t('List')}</NavItem>
    <NavItem to="/about">{t('About')}</NavItem>
  </Nav>
))

export const BaseLayout: FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <div>
        <GlobalStyle />
        <SiteTitle />
        <Helmet>
          <meta name="description" content="明镜止水的个人日志" />
          <meta name="keywords" content="明镜止水, HP, BLOG" />
        </Helmet>

        <HeaderWrap>
          <Header>
            <H1 id="blog-title">
              <H1Link to="/blog">明镜止水</H1Link>
            </H1>
            <Navigation />
          </Header>
        </HeaderWrap>
        <Content>{children}</Content>
        <Shortcut />
      </div>
    </I18nextProvider>
  </ThemeProvider>
)
