import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

const HeaderWrap = styled.div`
  background: white;
  margin-bottom: ${rhythm(1)};
`

const Header = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${rhythm(1)} ${rhythm(3 / 4)};
`

const H1 = styled.h1`
  margin: 0;
`

const H1Link = styled(Link)`
  text-decoration: none;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: ${rhythm(1)} ${rhythm(3 / 4)};
  padding-top: 0;
`

const Template = ({ children }) => (
  <div>
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'かがみ的个人日志' },
            { name: 'keywords', content: 'かがみ, HP, BLOG' },
          ]}
        />
      )}
    />
    <HeaderWrap>
      <Header>
        <H1>
          <H1Link to="/">Gatsby</H1Link>
        </H1>
      </Header>
    </HeaderWrap>
    <Content>{children}</Content>
  </div>
)

Template.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object,
  }).isRequired,
  children: PropTypes.element.isRequired,
}

export default Template
