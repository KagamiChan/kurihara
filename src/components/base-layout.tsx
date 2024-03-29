import { FC, useState, useCallback, PropsWithChildren } from 'react'
import { Link } from 'gatsby-link'
import { Helmet } from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { I18nextProvider, useTranslation } from 'react-i18next'
import tw, { GlobalStyles } from 'twin.macro'
import i18n from '../i18n'

import { SiteTitle } from './site-title'
import { Shortcut } from './shortcut'
import { commonMargin } from './common'
import { theme } from '../utils/style'
import { SiteLogo } from './site-logo'

import 'prismjs/themes/prism.css'

const GlobalStyle = createGlobalStyle`
  * {
    :focus {
      outline-style: dashed;
      outline-width: 2px;
    }
  }

  html {
    ${tw`font-serif`}
    font-size: 20px;
  }
`

const HeaderWrap = styled.div<{ hasBackdrop: boolean }>`
  ${tw`bg-white sticky top-0 z-10`}

  ${(props) => props.hasBackdrop && tw`shadow-lg`}
`

const Header = styled.div`
  ${commonMargin} max-width: 960px;
  display: flex;
  align-items: center;
`

const H1 = styled.h1`
  margin: 0;
  display: block;
`

const H1Link = styled(Link)`
  ${tw`bg-no-repeat bg-contain overflow-hidden w-32 h-16 block text-blue-500 flex items-center justify-center`}
`

const Nav = styled.nav`
  ${tw`flex items-center ml-4`}
`

const NavItem = styled(Link)`
  ${tw`relative text-xl pl-2 pr-2`}

  :hover {
    ${tw`text-blue-500`}
    :before {
      ${tw`block w-full h-px bg-blue-400 absolute left-0 bottom-0`}
      content: '';
    }
  }
`

const Content = styled.div`
  ${commonMargin}
  ${tw`max-w-6xl mt-4`}
`

const Navigation = () => {
  const { t } = useTranslation(['ui'])
  return (
    <Nav>
      <NavItem to="/archieves">{t('Archives')}</NavItem>
      <NavItem to="./">{t('List')}</NavItem>
      <NavItem to="/about">{t('About')}</NavItem>
    </Nav>
  )
}

export const BaseLayout: FC<PropsWithChildren<any>> = ({ children }) => {
  const [visible, setVisible] = useState(false)

  const handleVisibilityChange = useCallback((visibility) => {
    setVisible(visibility)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <div>
          <GlobalStyles />
          <GlobalStyle />
          <SiteTitle />
          <Helmet>
            <meta name="description" content="明镜止水的个人日志" />
            <meta name="keywords" content="明镜止水, HP, BLOG" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap"
              rel="stylesheet"
            />
          </Helmet>

          <HeaderWrap hasBackdrop={visible}>
            <Header>
              <H1 id="blog-title">
                <H1Link to="/blog">
                  <SiteLogo role="img" aria-label="少年读书隙中窥月" />
                </H1Link>
              </H1>
              <Navigation />
            </Header>
          </HeaderWrap>
          <Content>{children}</Content>
          <Shortcut onVisibilityChange={handleVisibilityChange} />
        </div>
      </I18nextProvider>
    </ThemeProvider>
  )
}
