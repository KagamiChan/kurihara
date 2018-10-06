import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>Hi people</h1>
          <p>Welcome to page 2</p>
          <Link to="/">Go back to the homepage</Link>
        </div>
      </Layout>
    )
  }
}
