import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import CodeEditor from './code_editor';
const codeEditorSource = require('!!raw-loader!./code_editor');
const codeEditorHtml = renderToHtml(CodeEditor);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Code Editor"
      source={[{
        type: GuideSectionTypes.JS,
        code: codeEditorSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: codeEditorHtml,
      }]}
      text={
        <div>
          <p>
            The <EuiCode>EuiCodeEditor</EuiCode> component is a wrapper around <EuiCode>codemirror</EuiCode>.
          </p>
          <p>
            All parameters, that you specify are passed down to the
            underlying <EuiCode>CodeMirror</EuiCode> component.
          </p>
        </div>
      }
      demo={
        <CodeEditor />
      }
    />
  </GuidePage>
);

