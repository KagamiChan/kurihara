import React, { FC } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { Trans } from 'react-i18next'

import { FooterWrapper } from './common'
import { LanguageSwitch } from './language-switch'

const Wrapper = styled(FooterWrapper)`
  margin-bottom: 0;

  a:hover {
    background-color: ${props => rgba(props.theme.blue, 0.1)};
  }
`

const nowYear = new Date().getFullYear()

/* eslint-disable prettier/prettier */
export const Meta: FC<void> = () => (
  <Wrapper>
    <LanguageSwitch />
    <div>
      <Trans i18nKey="ui:meta_first_line">
        自豪地基于 <a href="https://reactjs.org">React.js</a> 与 <a href="https://gatsbyjs.org">Gatsby.js</a> 驱动 | 托管于 Netlify | <a href="/rss.xml">RSS 订阅可用</a>
      </Trans>
    </div>
    <div>
      <Trans i18nKey="ui:meta_second_line">
        内容基于 <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">CC-BY-SA 4.0</a> 授权 | 评点或斧正可以 <a href="https://github.com/KagamiChan/kurihara/issues/new"> 在此提交 issue </a>
      </Trans>
    </div>
    <div>2013-{nowYear} 鏡 ＠ がんばらないプロジェクト / 夜ノ森工房</div>
  </Wrapper>
)
/* eslint-enable prettier/prettier */
