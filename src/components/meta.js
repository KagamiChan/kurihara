import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { rhythm } from '../utils/typography'

import { FooterWrapper } from './common'

const Wrapper = styled(FooterWrapper)`
  background: ${props => rgba(props.theme.blue, 0.1)};
  color: ${props => props.theme.blue};
  margin-top: ${rhythm(2)};

  a:hover {
    background-color: ${props => rgba(props.theme.blue, 0.2)};
  }
`

const nowYear = new Date().getFullYear()

const Comment = () => (
  <Wrapper>
    自豪地基于 <a href="https://reactjs.org">React.js</a> 与{' '}
    <a href="https://gatsbyjs.org">Gatsby.js</a> 驱动 | 托管于 Netlify
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
