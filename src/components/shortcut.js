import React, { Component } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { rhythm } from '../utils/typography'

const Sentinel = styled.div`
  position: absolute;
  top: ${rhythm(4)};
  left: 0;
`

const Button = styled.a`
  border-radius: ${rhythm(0.5)};
  height: ${rhythm(1)};
  min-width: ${rhythm(1)};
  transition: 0.3s;
  background-color: ${props => rgba(props.theme.blue, 0.75)};
  position: fixed;
  left: ${rhythm(0.5)};
  bottom: ${rhythm(1)};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.visible ? 1 : 0)};
  text-decoration: none;

  :hover {
    background-color: ${props => rgba(props.theme.blue, 1)};
  }

  svg {
    width: 0.875em;
  }
`

class Shortcut extends Component {
  state = {
    visible: false,
  }

  sentinel = React.createRef()

  componentDidMount = async () => {
    await import('intersection-observer')
    this.observer = new IntersectionObserver(this.handleIntersect)
    if (this.sentinel.current) {
      this.observer.observe(this.sentinel.current)
    }
  }

  componentWillUnmount = () => {
    this.observer.disconnect()
  }

  handleIntersect = ([{ isIntersecting }]) => {
    const { visible } = this.state
    if (visible !== !isIntersecting) {
      this.setState({
        visible: !isIntersecting,
      })
    }
  }

  render() {
    const { visible } = this.state
    return (
      <>
        <Sentinel ref={this.sentinel} />
        <Button visible={visible} href="#blog-title" title="回到顶部">
          <svg
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
            />
          </svg>
        </Button>
      </>
    )
  }
}

export default Shortcut
