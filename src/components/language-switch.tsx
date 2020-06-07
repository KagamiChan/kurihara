import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { map } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'
import tw from 'twin.macro'

const LANGUAGES = [
  {
    display: '简体中文',
    value: 'zh-CN',
  },
  {
    display: '日本語',
    value: 'ja',
  },
  {
    display: 'English',
    value: 'en',
  },
  {
    display: 'Français',
    value: 'fr',
  },
]

const Switches = styled.div`
  ${tw`flex items-center`}
`

const Switch = styled.div<{ active: boolean }>`
  ${tw`cursor-pointer pl-2 pr-2`}

  ${(props) => props.active && tw`font-semibold`}
`

const LangugeIndicator = styled.div``

export const LanguageSwitch: FC<{}> = () => {
  const { i18n } = useTranslation()

  const currentLanguage = useMemo(() => i18n.language, [i18n.language])

  return (
    <LangugeIndicator className="language-switch">
      <Switches>
        <FontAwesomeIcon icon={faLanguage} />
        {map(LANGUAGES, ({ display, value }) => (
          <Switch
            active={currentLanguage === value}
            key={value}
            className="language-switch-item"
            data-testid={value}
            onClick={(): void => {
              i18n.changeLanguage(value)
            }}
          >
            {display}
          </Switch>
        ))}
      </Switches>
    </LangugeIndicator>
  )
}
