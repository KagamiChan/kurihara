const path = require('path')

module.exports = {
  siteMetadata: {
    title: '少年读书隙中窥月',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, './src/posts/'),
      },
    },
    'gatsby-transformer-remark',
  ],
}
