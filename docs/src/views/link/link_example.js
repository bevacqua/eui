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

import Link from './link';
const linkSource = require('!!raw-loader!./link');
const linkHtml = renderToHtml(Link);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Link"
      source={[{
        type: GuideSectionTypes.JS,
        code: linkSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: linkHtml,
      }]}
      text={
        <p>
          <EuiCode>EuiLink</EuiCode> will apply the correct styling onto
          links and make sure the are accessible. Links can be passed a color.
          Note that the <EuiCode>ghost</EuiCode> type should only be used on
          dark backgrounds (regardless of theming). It will always create a white
          link.
        </p>
      }
      demo={
        <Link />
      }
    />
  </GuidePage>
);
