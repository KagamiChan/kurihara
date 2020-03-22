import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp'
import 'intersection-observer'

import { rhythm } from '../utils/typography'

const Sentinel = styled.div`
  position: absolute;
  top: ${rhythm(4)};
  left: 0;
`

const Button = styled.a<{ visible: boolean }>`
  border-radius: ${rhythm(0.5)};
  height: ${rhythm(1)};
  min-width: ${rhythm(1)};
  transition: 0.3s;
  background-color: ${(props) => rgba(props.theme.blue, 0.75)};
  position: fixed;
  left: ${rhythm(0.5)};
  bottom: ${rhythm(1)};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  text-decoration: none;

  :hover {
    background-color: ${(props) => rgba(props.theme.blue, 1)};
  }
`

export const Shortcut = () => {
  const [visible, setVisible] = useState(false)

  const sentinel = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = ([
      { isIntersecting },
    ]) => setVisible(!isIntersecting)

    const observer = new IntersectionObserver(handleIntersect)
    if (sentinel.current) {
      observer.observe(sentinel.current)
    }

    return () => observer?.disconnect()
  }, [])

  return (
    <>
      <Sentinel ref={sentinel} />
      <Button visible={visible} href="#blog-title" title="回到顶部">
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
    </>
  )
}
