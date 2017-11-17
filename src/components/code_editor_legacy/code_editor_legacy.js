import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AceEditor from 'react-ace';

import 'brace/theme/chrome';
import 'brace/theme/tomorrow_night';

import { EuiKeyboardAccessible } from '..';
import { htmlIdGenerator, keyCodes } from '../../services';

const themes = {
  light: `chrome`,
  dark: `tomorrow_night`
};
const COLOR_NAMES = Object.keys(themes);

export class EuiCodeEditorLegacy extends Component {

  state = {
    isHintActive: true
  };

  idGenerator = htmlIdGenerator();

  aceEditorRef = (aceEditor) => {
    if (aceEditor) {
      this.aceEditor = aceEditor;
      aceEditor.editor.textInput.getElement().tabIndex = -1;
      aceEditor.editor.textInput.getElement().addEventListener('keydown', this.onKeydownAce);
      aceEditor.editor.commands.removeCommands([`gotoline`, `find`]);
      aceEditor.editor.setShowPrintMargin(false);
    }
  };

  onKeydownAce = (ev) => {
    if (ev.keyCode === keyCodes.ESCAPE) {
      ev.preventDefault();
      ev.stopPropagation();
      this.stopEditing();
      this.editorHint.focus();
    }
  }

  onBlurAce = (...args) => {
    this.stopEditing();
    if (this.props.onBlur) {
      this.props.onBlur(...args);
    }
  };

  startEditing = () => {
    this.setState({ isHintActive: false });
    this.aceEditor.editor.textInput.focus();
  }

  stopEditing() {
    this.setState({ isHintActive: true });
  }

  render() {
    const {
      color,
      width,
      height,
      language,
      onBlur, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames('euiCodeEditorLegacyKeyboardHint', {
      'euiCodeEditorLegacyKeyboardHint-isInactive': !this.state.isHintActive
    });

    return (
      <div
        className="euiCodeEditorLegacyWrapper"
        style={{ width, height }}
      >
        <EuiKeyboardAccessible>
          <div
            className={classes}
            id={this.idGenerator('codeEditorLegacy')}
            ref={(hint) => { this.editorHint = hint; }}
            onClick={this.startEditing}
            data-test-subj="codeEditorLegacyHint"
          >
            <p className="euiText euiVerticalRhythmSmall">
              Press Enter to start editing.
            </p>

            <p className="euiText euiVerticalRhythmSmall">
              When you&rsquo;re done, press Escape to stop editing.
            </p>
          </div>
        </EuiKeyboardAccessible>

        <AceEditor
          ref={this.aceEditorRef}
          width={width}
          height={height}
          mode={language}
          onBlur={this.onBlurAce}
          theme={themes[color]}
          {...rest}
        />
      </div>
    );
  }
}

EuiCodeEditorLegacy.propTypes = {
  color: PropTypes.oneOf(COLOR_NAMES),
  width: PropTypes.string,
  height: PropTypes.string,
  onBlur: PropTypes.func,
};
