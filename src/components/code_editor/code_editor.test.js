import React from 'react';
import { mount } from 'enzyme';
import { EuiCodeEditor } from './code_editor';
import {
  requiredProps,
  takeMountedSnapshot,
} from '../../test';

jest.mock('./CodeMirror', () => `CodeMirror`);

describe('EuiCodeEditor', () => {
  test('is rendered', () => {
    const component = mount(<EuiCodeEditor {...requiredProps}/>);
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });
});
