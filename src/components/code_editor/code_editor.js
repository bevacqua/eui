import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CodeMirror from './CodeMirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/yaml/yaml';

const languages = {
  json: `application/json`,
  yaml: `text/x-yaml`,
  text: `text/plain`
};

const themes = {
  light: `neat`,
  dark: `dracula`
};

const COLOR_NAMES = Object.keys(themes);

export class EuiCodeEditor extends Component {
  codeMirrorRef = (codeMirror) => {
    if (codeMirror) {
      this.codeMirror = codeMirror;
    }
  };

  render() {
    const {
      color,
      language,
      onBlur, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const codeMirrorOptions = {
      mode: languages[language] || language,
      theme: themes[color],
      indentUnit: 2,
      tabSize: 2,
      smartIndent: true,
      lineNumbers: false,
      electricChars: true
    };

    return (
      <div className="euiCodeEditorWrapper">
        <CodeMirror
          ref={this.codeMirrorRef}
          options={codeMirrorOptions}
          {... rest}
        />
      </div>
    );
  }
}

EuiCodeEditor.propTypes = {
  color: PropTypes.oneOf(COLOR_NAMES),
  width: PropTypes.string,
  height: PropTypes.string,
  onBlur: PropTypes.func,
};
