import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const SiteTitle = ({ suffix }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Helmet>
        <title>
          {`${data.site.siteMetadata.title}${suffix ? `::${suffix}` : ''}`}
        </title>
      </Helmet>
    )}
  />
)

SiteTitle.propTypes = {
  suffix: PropTypes.node.isRequired,
}

export default SiteTitle
