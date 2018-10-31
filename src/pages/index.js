import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { map, debounce, times } from 'lodash'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'
import sprite from '../assets/sprite.png'

const GlobalStyle = createGlobalStyle`
  html{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body{
    overflow: hidden;
    min-width: 720px;
    height: 100%;
  }
`

const spriteStyle = `
  text-indent: -999px;
  overflow: hidden;
  display: block;
  background-image: url('${sprite}');
  background-size: 800px 270px;
  background-repeat: no-repeat;
`

const Wrapper = styled.div`
  z-index: 10;
  position: absolute;
  left: ${rhythm(4)};
  top: ${rhythm(4)};
`

const Title = styled.h1`
  ${spriteStyle} width: 300px;
  height: 72px;
  background-position: 0px 0px;

  :hover {
    background-position: 0px -72px;
    cursor: pointer;
  }
`

const Footer = styled.div`
  ${spriteStyle} width: 450px;
  height: 80px;
  position: absolute;
  bottom: 5%;
  left: ${rhythm(4)};
  margin-left: 20px;
  background-position: -108px -235px;
`

const List = styled.ul`
  padding: 0 0 0 4px;
  margin: 0;
`

const ListItem = styled.li`
  list-style: none;
  display: block;
  float: left;
  padding: 0;
  margin: 0;
`

const LinkItem = styled.a`
  ${spriteStyle} height: 46px;
  width: ${props => props.width}px;
  background-position: ${props => props.positionX || 0}px -144px;

  :hover {
    background-position-y: -190px;
    cursor: pointer;
  }
`

const Canvas = styled.canvas`
  z-index: 0;
  position: absolute;
`

const colorList = ['#00aeef', '#f68e56', '#8dc63f', '#f06eaa']

const drawFlower = (ctx, x0, y0, r, theta, style) => {
  ctx.beginPath()
  times(5, i => {
    const a0 = ((theta + 72 * i) / 180) * Math.PI
    const a1 = ((theta + 72 * i + 72) / 180) * Math.PI
    const a0x = x0 + r * Math.cos(a0)
    const a0y = y0 + r * Math.sin(a0)
    const centerX = x0 + 0.5 * r * (Math.cos(a0) + Math.cos(a1))
    const centerY = y0 + 0.5 * r * (Math.sin(a0) + Math.sin(a1))
    const centerR = r * Math.sin((36 * Math.PI) / 180)
    const startAngle = Math.atan2(a0y - centerY, a0x - centerX)
    const endAngle = startAngle + Math.PI
    ctx.arc(centerX, centerY, centerR, startAngle, endAngle)
  })
  ctx.closePath()
  ctx.fillStyle = style
  ctx.strokeStyle = '#dddddd'
  ctx.fill()
  ctx.stroke()
}

const links = [
  {
    name: 'blog',
    url: '/blog',
    width: 88,
    positionX: -4,
  },
  {
    name: 'zhihu',
    width: 88,
    url: 'https://www.zhihu.com/people/kagamichan',
    positionX: -90,
  },
  {
    name: 'weibo',
    url: 'https://weibo.com/coolszm',
    width: 88,
    positionX: -178,
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/seki_kagami',
    width: 122,
    positionX: -266,
  },
  {
    name: 'github',
    url: 'https://github.com/kagamichan',
    width: 122,
    positionX: -388,
  },
]

export default class Index extends React.Component {
  canvas = React.createRef()

  drawCanvas = debounce(() => {
    const canvas = this.canvas.current
    const ctx = canvas.getContext('2d')

    const pr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = w * pr
    canvas.height = h * pr
    ctx.scale(pr, pr)
    ctx.globalAlpha = 0.25

    ctx.clearRect(0, 0, w, h)
    const index = Math.floor(Math.random() * 4)
    times(30, () =>
      drawFlower(
        ctx,
        0.5 * w + w * Math.sin(Math.random() - 0.5),
        h * Math.random(),
        0.02 * h + 0.02 * w * Math.random(),
        360 * Math.random(),
        colorList[index],
      ),
    )
  }, 50)

  componentDidMount = () => {
    if (typeof window !== 'undefined') {
      this.drawCanvas()

      document.addEventListener('click', this.drawCanvas)
      document.addEventListener('touchstart', this.drawCanvas)
      window.addEventListener('resize', this.drawCanvas)
    }
  }

  componentWillMount = () => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.drawCanvas)
      document.removeEventListener('touchstart', this.drawCanvas)
      window.removeEventListener('resize', this.drawCanvas)
    }
  }

  render() {
    return (
      <>
        <Wrapper>
          <Helmet>
            <title>明镜止水::春擬き</title>
          </Helmet>
          <Title title="冴えない HP の育てかた">明镜止水</Title>
          <GlobalStyle />
          <nav>
            <List>
              {map(links, link => (
                <ListItem key={link.name}>
                  <LinkItem
                    href={link.url}
                    width={link.width}
                    positionX={link.positionX}
                  >
                    {link.name}
                  </LinkItem>
                </ListItem>
              ))}
            </List>
          </nav>
        </Wrapper>
        <Footer>鏡 ＠ がんばらないプロジェクト/翠星製作所</Footer>
        <Canvas ref={this.canvas} />
      </>
    )
  }
}
