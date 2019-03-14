import { shallow } from 'enzyme';
import * as React from 'react';

import { mockRouterProps } from '../../mocks/components';
import { ExternalLibraryName, ExternalLibraryNames } from '../assessment/assessmentShape';
import Playground, { IPlaygroundProps } from '../Playground';

const baseProps = {
  editorValue: '',
  editorBreakpoints: [],
  editorHighlights: [],
  isRunning: false,
  isDebugging: false,
  debuggerActive: true,
  debuggerAllowed: true,
  activeTab: 0,
  editorWidth: '50%',
  isEditorAutorun: false,
  sideContentHeight: 40,
  sourceChapter: 2,
  externalLibraryName: ExternalLibraryNames.NONE,
  output: [],
  replValue: '',
  handleBrowseHistoryDown: () => {},
  handleBrowseHistoryUp: () => {},
  handleChangeActiveTab: (n: number) => {},
  handleChapterSelect: (chapter: number) => {},
  handleEditorEval: () => {},
  handleEditorValueChange: () => {},
  handleSetEditorBreakpoint: (editorBreakpoints: string[]) => {},
  handleEditorWidthChange: (widthChange: number) => {},
  handleExternalSelect: (externalLibraryName: ExternalLibraryName) => {},
  handleGenerateLz: () => {},
  handleInterruptEval: () => {},
  handleReplEval: () => {},
  handleReplOutputClear: () => {},
  handleReplValueChange: (code: string) => {},
  handleSideContentHeightChange: (h: number) => {},
  handleToggleEditorAutorun: () => {},
  handleDebuggerPause: () => {},
  handleDebuggerResume: (debuggerActive: boolean) => {},
  handleDebuggerReset: () => {},
  handleActivateDebugger: () => {},
  handleDeactivateDebugger: () => {},
};

const testValueProps: IPlaygroundProps = {
  ...baseProps,
  ...mockRouterProps('/academy', {}),
  editorValue: 'Test value'
};

const playgroundLinkProps: IPlaygroundProps = {
  ...baseProps,
  ...mockRouterProps('/playground#lib=2&prgrm=CYSwzgDgNghgngCgOQAsCmUoHsCESCUA3EA', {}),
  editorValue: 'This should not show up'
};

test('Playground renders correctly', () => {
  const app = <Playground {...testValueProps} />;
  const tree = shallow(app);
  expect(tree.debug()).toMatchSnapshot();
});

test('Playground with link renders correctly', () => {
  const app = <Playground {...playgroundLinkProps} />;
  const tree = shallow(app);
  expect(tree.debug()).toMatchSnapshot();
});
