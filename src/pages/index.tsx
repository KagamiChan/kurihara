import React, { FunctionComponent, useRef, useCallback, useEffect } from 'react'
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from 'styled-components'
import { rgba } from 'polished'
import { map, debounce, times } from 'lodash'
import { Helmet } from 'react-helmet'
import { I18nextProvider, useTranslation } from 'react-i18next'

import { LanguageSwitch } from '../components/language-switch'
import { media, theme } from '../utils/style'
import i18n from '../i18n'

const colorList = [theme.blue, theme.green, theme.pink, theme.orange]

const commonLeft = css`
  /* left: ${rhythm(4)};
  ${media.desktop`left: ${rhythm(2)};`} */
  ${media.tablet`left: 0;`}
`

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

const Wrapper = styled.div`
  z-index: 10;
  position: absolute;
  /* top: ${rhythm(4)}; */
  ${commonLeft};
`

const Title = styled.h1`
  /* font-size: ${rhythm(2)}; */
  font-weight: 200;
`

const Footer = styled.div`
  position: absolute;
  bottom: 5%;
  ${commonLeft};
`

const List = styled.ul`
  margin: 0;
`

const ListItem = styled.li`
  list-style: none;
  display: block;
  float: left;
  padding: 0;
  margin: 0;
  /* margin-left: ${rhythm(-0.5)}; */
`

const LinkItem = styled.a<{ index: number }>`
  text-decoration: none;
  color: inherit;
  display: block;
  /* margin: ${rhythm(0.25)}; */
  /* padding: ${rhythm(0.25)}; */
  transition: 0.3s;
  font-weight: 200;
  /* font-size: ${rhythm(0.8)}; */

  cursor: pointer;

  :hover {
    color: ${(props) => colorList[props.index % colorList.length]};
  }

  :active {
    background-color: ${(props) =>
      rgba(colorList[props.index % colorList.length], 0.1)};
  }
`

const Canvas = styled.canvas`
  z-index: -1;
  position: absolute;
`

const drawFlower = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  r: number,
  theta: number,
  style: string,
): void => {
  ctx.beginPath()
  times(5, (i) => {
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
  },
  {
    name: 'zhihu',
    url: 'https://www.zhihu.com/people/kagamichan',
  },
  {
    name: 'weibo',
    url: 'https://weibo.com/coolszm',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/seki_kagami',
  },
  {
    name: 'github',
    url: 'https://github.com/kagamichan',
  },
]

const PageContent: FunctionComponent<{}> = () => {
  const { t } = useTranslation(['ui'])
  return (
    <>
      <Wrapper>
        <Helmet>
          <title>明镜止水::春擬き</title>
        </Helmet>
        <Title id="site-title" title="明镜止水">
          明镜止水
        </Title>
        <GlobalStyle />
        <nav>
          <List>
            {map(links, (link, i) => (
              <ListItem key={link.name}>
                <LinkItem href={link.url} index={i}>
                  {t(link.name)}
                </LinkItem>
              </ListItem>
            ))}
          </List>
        </nav>
      </Wrapper>
      <Footer>
        <LanguageSwitch />鏡 ＠ がんばらないプロジェクト/翠星製作所
      </Footer>
    </>
  )
}

const Index: FunctionComponent<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const drawCanvas = useCallback(
    debounce(() => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }

      const pr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w * pr
      canvas.height = h * pr
      ctx.scale(pr, pr)
      ctx.globalAlpha = 0.25

      ctx.clearRect(0, 0, w, h)
      const randomNess = () => Math.random()
      const index = Math.floor(Math.random() * 4)
      times(30, () =>
        drawFlower(
          ctx,
          0.5 * w + w * Math.sin(randomNess() - 0.5),
          h * randomNess(),
          0.02 * h + 0.02 * w * randomNess(),
          360 * randomNess(),
          colorList[index],
        ),
      )
    }, 50),
    [],
  )

  useEffect(() => {
    // Skips SSR
    if (typeof window !== 'undefined') {
      drawCanvas()

      document.addEventListener('click', drawCanvas)
      document.addEventListener('touchstart', drawCanvas)
      window.addEventListener('resize', drawCanvas)
    }

    return (): void => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', drawCanvas)
        document.removeEventListener('touchstart', drawCanvas)
        window.removeEventListener('resize', drawCanvas)
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <>
          <PageContent />
          <Canvas ref={canvasRef} />
        </>
      </I18nextProvider>
    </ThemeProvider>
  )
}

export default Index
