import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <Link to="/page-2/">Go to page 2</Link>
        </div>
      </Layout>
    )
  }
}
