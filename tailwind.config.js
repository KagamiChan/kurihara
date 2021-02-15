/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require('tailwindcss/colors')

const fontFamily = [
  'source-han-serif-sc',
  'Source Han Serif SC',
  'Times',
  'Times New Roman',
  'STSong',
  'SimSun',
  'serif',
  'system-ui',
]

module.exports = {
  theme: {
    fontFamily: {
      serif: fontFamily,
    },
    colors: {
      orange: colors.orange,
      blue: colors.lightBlue,
      gray: colors.coolGray,
      white: colors.white,
      green: colors.green,
    },
    extend: {
      inset: {
        4: '1rem',
        8: '2rem',
        16: '4rem',
      },
      minWidth: {
        lg: '32rem',
      },
      zIndex: {
        '-1': -1,
      },
    },
  },
}
