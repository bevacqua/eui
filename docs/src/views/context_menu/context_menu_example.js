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

import ContextMenu from './context_menu';
const contextMenuSource = require('!!raw-loader!./context_menu');
const contextMenuHtml = renderToHtml(ContextMenu);

import SinglePanel from './single_panel';
const singlePanelSource = require('!!raw-loader!./single_panel');
const singlePanelHtml = renderToHtml(SinglePanel);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Context Menu"
      source={[{
        type: GuideSectionTypes.JS,
        code: contextMenuSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: contextMenuHtml,
      }]}
      text={
        <p>
          <EuiCode>EuiContextMenu</EuiCode> is a nested menu system useful
          for navigating complicated trees. It lives within a <EuiCode>EuiPopover</EuiCode>
          which itself can be wrapped around any component (like a button in this example).
        </p>
      }
      demo={
        <ContextMenu />
      }
    />
    <GuideSection
      title="Context menu doesn't need to nest"
      source={[{
        type: GuideSectionTypes.JS,
        code: singlePanelSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: singlePanelHtml,
      }]}
      text={
        <p>
          Context menus can be used for simple, non-nested menus as well. The below
          pagination example has no nesting and no title.
        </p>

     }
      demo={
        <SinglePanel />
     }
    />
  </GuidePage>
);
