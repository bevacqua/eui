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

import CodeEditorLegacy from './code_editor_legacy';
const codeEditorLegacySource = require('!!raw-loader!./code_editor_legacy');
const codeEditorLegacyHtml = renderToHtml(CodeEditorLegacy);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Code Editor (Legacy)"
      source={[{
        type: GuideSectionTypes.JS,
        code: codeEditorLegacySource,
      }, {
        type: GuideSectionTypes.HTML,
        code: codeEditorLegacyHtml,
      }]}
      text={
        <div>
          <p>
            The <EuiCode>EuiCodeEditorLegacy</EuiCode> component is a wrapper around <EuiCode>react-ace</EuiCode> (which
            itself wraps the ACE code editor), that adds an accessible keyboard mode
            to it. You should always use this component instead of <EuiCode>AceEditor</EuiCode>.
          </p>
          <p>
            All parameters, that you specify are passed down to the
            underlying <EuiCode>AceEditor</EuiCode> component.
          </p>
        </div>
      }
      demo={
        <CodeEditorLegacy />
      }
    />
  </GuidePage>
);

