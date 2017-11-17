// Fork of https://github.com/JedWatson/react-codemirror (MIT license)

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import codeMirror from 'codemirror';
import { differenceWith, isEqual, noop, toPairs } from 'lodash';

class CodeMirror extends Component {
  componentDidMount() {
    const { options, value } = this.props;

    this.codeMirror = codeMirror.fromTextArea(this._textareaNode, options);
    this.codeMirror.on(`change`, this.codemirrorValueChanged.bind(this));
    this.codeMirror.on(`focus`, this.focusChanged.bind(this, true));
    this.codeMirror.on(`blur`, this.focusChanged.bind(this, false));
    this.codeMirror.on(`scroll`, this.scrollChanged.bind(this));
    this.codeMirror.setValue(value);
  }

  componentWillReceiveProps(nextProps) {
    this.updateValue(nextProps.value);
    this.updateName(nextProps.name);
    this.updateOptions(nextProps.options);
    this.updateClassName(nextProps.className);
  }

  shouldComponentUpdate() {
    return !(this._textareaNode && this._containerNode);
  }

  componentWillUnmount() {
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }

  render() {
    const { path, value } = this.props;
    return (
      <div
        ref={c => { this._containerNode = c; }}
        className={this.computeClassName()}
      >
        <textarea
          ref={c => { this._textareaNode = c; }}
          name={path}
          defaultValue={value}
          autoComplete="off"
        />
      </div>
    );
  }

  focus() {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  }

  focusChanged(focused) {
    this.updateClassName();
    this.props.onFocusChange(focused);
  }

  scrollChanged(cm) {
    this.props.onScroll(cm.getScrollInfo());
  }

  codemirrorValueChanged(doc, change) {
    if (change.origin !== `setValue`) {
      this.props.onChange(doc.getValue());
    }
  }

  computeClassName(userClassName) {
    const cm = this.codeMirror;

    return cx(
      `euiCodeMirror`,
      userClassName || this.props.className,
      { 'euiCodeMirror--focused': cm && cm.hasFocus() }
    );
  }

  updateValue(next = ``) {
    const cm = this.codeMirror;
    if (!cm) return;
    if (next === cm.getValue()) return;

    cm.setValue(next);
  }

  updateName(next) {
    const textarea = this._textareaNode;
    if (!textarea) return;
    if (next === textarea.getAttribute(`name`)) return;

    if (next) {
      textarea.setAttribute(`name`, next);
    } else {
      textarea.removeAttribute(`name`);
    }
  }

  updateOptions(next) {
    const currentPairs = toPairs(this.props.options);
    const nextPairs = toPairs(next);
    const pairIsEqual = (a, b) => isEqual(a[1], b[1]);
    const updatedPairs = differenceWith(nextPairs, currentPairs, pairIsEqual);

    updatedPairs.forEach(pair =>
      this.codeMirror.setOption(...pair)
    );
  }

  updateClassName(userClassName) {
    const cm = this.codeMirror;
    const container = this._containerNode;
    if (!cm || !container) return;

    const className = this.computeClassName(userClassName);

    if (container.className !== className) {
      container.className = className;
    }
  }
}

CodeMirror.defaultProps = {
  onFocusChange: noop,
  onScroll: noop,
  onChange: noop,
  value: ``
};

CodeMirror.propTypes = {
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  onScroll: PropTypes.func,
  options: PropTypes.object,
  path: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.any
};

export default CodeMirror;
