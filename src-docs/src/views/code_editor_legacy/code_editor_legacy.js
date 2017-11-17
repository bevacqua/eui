import React, { Component } from 'react';

import 'brace/mode/javascript';

import {
  EuiCodeEditorLegacy,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  state = {
    value: ''
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <EuiCodeEditorLegacy
          language="javascript"
          color="light"
          width="100%"
          value={this.state.value}
          onChange={this.onChange}
          setOptions={{ fontSize: '14px' }}
          onBlur={() => { console.log('blur'); }}
        />

        <EuiSpacer />

        <EuiCodeEditorLegacy
          language="javascript"
          color="dark"
          width="100%"
          value={this.state.value}
          onChange={this.onChange}
          setOptions={{ fontSize: '14px' }}
          onBlur={() => { console.log('blur'); }}
        />
      </div>
    );
  }
}
