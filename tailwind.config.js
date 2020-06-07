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
