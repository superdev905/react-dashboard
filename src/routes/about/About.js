/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Page from '../../components/Page';

class About extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = {};

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const data = await require.ensure([], require => require('./about.md'), 'about');
    this.setState({
      data
    });
  }

  render() {
    return <Page title={this.state.data ? this.state.data.title : ''} html={this.state.data ? this.state.data.html : ''}/>
  }
}

export default About;
