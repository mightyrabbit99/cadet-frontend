import * as React from 'react';

import { shallow } from 'enzyme';

import Editor, { IEditorProps } from '../Editor';

test('Editor renders correctly', () => {
  const props: IEditorProps = {
    editorValue: '',
    editorBreakpoints: [],
    editorHighlights: [],
    handleEditorEval: () => {},
    handleEditorValueChange: newCode => {},
    handleSetEditorBreakpoint: editorBreakpoints => {}
  };
  const app = <Editor {...props} />;
  const tree = shallow(app);
  expect(tree.debug()).toMatchSnapshot();
});
