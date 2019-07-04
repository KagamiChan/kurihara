import React from 'react'
import PropTypes from 'prop-types'
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from 'styled-components'
import { rgba } from 'polished'
import { map, debounce, times } from 'lodash'
import Helmet from 'react-helmet'
import { withTranslation, I18nextProvider } from 'react-i18next'

import LanguageSwitch from '../components/language-switch'
import { rhythm } from '../utils/typography'
import { media, theme } from '../utils/style'
import i18n from '../i18n'

import '../assets/blueprint.scss'

const colorList = [theme.blue, theme.green, theme.pink, theme.orange]

const commonLeft = css`
  left: ${rhythm(4)};
  ${media.desktop`left: ${rhythm(2)};`} ${media.tablet`left: 0;`};
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
  top: ${rhythm(4)};
  ${commonLeft};
`

const Title = styled.h1`
  font-size: ${rhythm(2)};
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
  margin-left: ${rhythm(-0.5)};
`

const LinkItem = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  margin: ${rhythm(0.25)};
  padding: ${rhythm(0.25)};
  transition: 0.3s;
  font-weight: 200;
  font-size: ${rhythm(0.8)};

  cursor: pointer;

  :hover {
    color: ${props => colorList[props.index % colorList.length]};
  }

  :active {
    background-color: ${props =>
      rgba(colorList[props.index % colorList.length], 0.1)};
  }
`

const Canvas = styled.canvas`
  z-index: -1;
  position: absolute;
`

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

export default
@withTranslation(['ui'])
class Index extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  canvas = React.createRef()

  drawCanvas = debounce(() => {
    const canvas = this.canvas.current
    if (!canvas) {
      return
    }
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
    const { t } = this.props
    return (
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <>
            <Wrapper>
              <Helmet>
                <title>明镜止水::春擬き</title>
              </Helmet>
              <Title title="明镜止水">明镜止水</Title>
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
            <Canvas ref={this.canvas} />
          </>
        </I18nextProvider>
      </ThemeProvider>
    )
  }
}
