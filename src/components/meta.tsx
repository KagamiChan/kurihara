import { FC } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

import { FooterWrapper } from './common'

const Wrapper = styled(FooterWrapper)`
  ${tw`mb-0`}
`

const nowYear = new Date().getFullYear()

/* eslint-disable prettier/prettier */
export const Meta: FC<Record<string, never>> = () => (
  <Wrapper>
    <div>
      自豪地基于 <a href="https://reactjs.org">React.js</a> 与{' '}
      <a href="https://gatsbyjs.org">Gatsby.js</a> 驱动 |{' '}
      <a href="/rss.xml">RSS 订阅可用</a>
    </div>
    <div>
      内容基于{' '}
      <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">
        CC-BY-SA 4.0
      </a>{' '}
      授权 | 评点或斧正可以{' '}
      <a href="https://github.com/KagamiChan/kurihara/issues/new">
        {' '}
        在此提交 issue{' '}
      </a>
    </div>
    <div>2013-{nowYear} 鏡 ＠ がんばらないプロジェクト / 夜ノ森工房</div>
  </Wrapper>
)
/* eslint-enable prettier/prettier */
