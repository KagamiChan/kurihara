import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { withNamespaces } from 'react-i18next'
import { map } from 'lodash'
import { rhythm } from '../utils/typography'

import { FooterWrapper } from './common'

const Wrapper = styled(FooterWrapper)`
  margin-bottom: 0;

  a:hover {
    background-color: ${props => rgba(props.theme.blue, 0.2)};
  }
`

const nowYear = new Date().getFullYear()

const LANGUAGES = [
  {
    display: '简体中文',
    value: 'zh-CN',
  },
  {
    display: '日本語',
    value: 'ja',
  },
  {
    display: 'English',
    value: 'en',
  },
  {
    display: 'Français',
    value: 'fr',
  },
]

const Switches = styled.div`
  display: flex;
`

const Switch = styled.div`
  margin-right: ${rhythm(0.5)};
  cursor: pointer;

  color: ${props => props.active && props.theme.blue};
`

const LanguageSwitch = withNamespaces()(({ i18n }) => (
  <Switches>
    {map(LANGUAGES, ({ display, value }) => (
      <Switch
        active={i18n.language === value}
        key={value}
        onClick={() => i18n.changeLanguage(value)}
      >
        {display}
      </Switch>
    ))}
  </Switches>
))

const Comment = () => (
  <Wrapper>
    <LanguageSwitch />
    自豪地基于 <a href="https://reactjs.org">React.js</a> 与{' '}
    <a href="https://gatsbyjs.org">Gatsby.js</a> 驱动 | 托管于 Netlify |{' '}
    <a href="/rss.xml">RSS 订阅可用</a>
    <br />
    内容基于{' '}
    <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">
      CC-BY-SA 4.0
    </a>{' '}
    授权。评点或斧正可以
    <a href="https://github.com/KagamiChan/kurihara/issues/new">
      在此提交 issue
    </a>
    。<br />
    2013-
    {nowYear} 鏡 ＠ がんばらないプロジェクト / 夜ノ森工房
  </Wrapper>
)

export default Comment
