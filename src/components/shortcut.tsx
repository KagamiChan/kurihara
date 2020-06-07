import React, { useRef, useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp'
import 'intersection-observer'
import tw from 'twin.macro'

const Sentinel = styled.div`
  ${tw`absolute left-0 top-8`}
`

const Button = styled.a<{ visible: boolean }>`
  ${tw`fixed left-4 bottom-4 rounded-full h-8 w-8 text-xl duration-100 bg-blue-500 opacity-75 text-white flex justify-center items-center cursor-pointer`}

  :hover {
    ${tw`opacity-100`}
  }

  ${(props) => !props.visible && tw`opacity-0`}
`

interface Props {
  onVisibilityChange: (visibility: boolean) => void
}

export const Shortcut: FC<Props> = ({ onVisibilityChange }) => {
  const [visible, setVisible] = useState(false)

  const sentinel = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = ([
      { isIntersecting },
    ]) => {
      setVisible(!isIntersecting)
      onVisibilityChange(!isIntersecting)
    }

    const observer = new IntersectionObserver(handleIntersect)
    if (sentinel.current) {
      observer.observe(sentinel.current)
    }

    return () => observer?.disconnect()
  }, [])

  return (
    <>
      <Sentinel ref={sentinel} />
      <Button
        visible={visible}
        onClick={() => (document.scrollingElement.scrollTop = 0)}
        title="回到顶部"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
    </>
  )
}
