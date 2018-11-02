import React, { Component } from 'react'

import SiteTitle from '../components/site-title'
import Layout from '../components/base-layout'
import Meta from '../components/meta'

class NotFound extends Component {
  render() {
    return (
      <Layout>
        <SiteTitle suffix="博丽大结界" />
        <div>你来到了结界的边缘，只看到一片空白</div>
        <Meta />
      </Layout>
    )
  }
}

export default NotFound
