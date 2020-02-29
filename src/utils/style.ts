import { css } from 'styled-components'
import { mapValues } from 'lodash'

enum sizes {
  giant = 1920,
  desktop = 1280,
  tablet = 864,
  phone = 480,
}

// iterate through the sizes and create a media template
export const media = mapValues(sizes, (size: number) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = size / 16
  return (...args: Parameters<typeof css>): ReturnType<typeof css> => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
})

export enum theme {
  blue = '#00aeef',
  orange = '#f68e56',
  green = '#8dc63f',
  pink = '#f06eaa',
  black = '#333',
  grey = '#999',
}
