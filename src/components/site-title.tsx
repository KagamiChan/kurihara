import React, { FC } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

export interface Props {
  suffix?: string
}

export const SiteTitle: FC<Props> = ({ suffix }) => {
  const data = useStaticQuery(
    graphql`
      query SiteTitle {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  )
  return (
    <Helmet>
      <title>
        {`${data.site.siteMetadata.title}${suffix ? `::${suffix}` : ''}`}
      </title>
    </Helmet>
  )
}
