import React, { FC } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { useTranslation } from 'react-i18next'
import { map } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage'

import { rhythm } from '../utils/typography'

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
  display: flex;
  align-items: center;
`

const Switch = styled.div<{ active: boolean }>`
  padding: ${rhythm(0.25)};
  margin: ${rhythm(0.25)};
  cursor: pointer;

  color: ${props => props.active && props.theme.blue};
  background-color: ${props => props.active && rgba(props.theme.blue, 0.1)};
`

const LangugeIndicator = styled.div`
  cursor: pointer;
`

export const LanguageSwitch: FC<void> = () => {
  const { i18n } = useTranslation()

  return (
    <LangugeIndicator className="language-switch">
      <Switches>
        <FontAwesomeIcon icon={faLanguage} />
        {map(LANGUAGES, ({ display, value }) => (
          <Switch
            active={i18n.language === value}
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
