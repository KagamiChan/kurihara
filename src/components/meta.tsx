import React, { FC } from 'react'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import tw from 'twin.macro'
import loadable from '@loadable/component'

import { FooterWrapper } from './common'

const Wrapper = styled(FooterWrapper)`
  ${tw`mb-0`}
`

const LanguageSwitch = loadable(() => import('./language-switch'), {
  ssr: false,
})

const nowYear = new Date().getFullYear()

/* eslint-disable prettier/prettier */
export const Meta: FC<{}> = () => (
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
