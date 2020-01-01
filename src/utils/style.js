import { css } from 'styled-components'
import { colors } from 'tailwindcss/defaultTheme'

const sizes = {
  giant: 1920,
  desktop: 1280,
  tablet: 864,
  phone: 480,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export const theme = {
  blue: colors.blue[500],
  orange: colors.orange[500],
  green: colors.green[500],
  pink: colors.pink[500],
  black: colors.black,
  grey: colors.gray[500],
}
