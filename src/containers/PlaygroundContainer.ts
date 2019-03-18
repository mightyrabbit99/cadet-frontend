import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import {
  activateDebugger,
  beginDebuggerPause,
  beginInterruptExecution,
  browseReplHistoryDown,
  browseReplHistoryUp,
  changeActiveTab,
  changeEditorWidth,
  changeSideContentHeight,
  chapterSelect,
  clearReplOutput,
  deactivateDebugger,
  debuggerNext,
  debuggerReset,
  debuggerResume,
  debuggerStepOut,
  debuggerStepOver,
  evalEditor,
  evalRepl,
  generateLzString,
  playgroundExternalSelect,
  setBreakpointInEditor,
  toggleEditorAutorun,
  updateEditorValue,
  updateReplValue,
  WorkspaceLocation
} from '../actions';
import { ExternalLibraryName } from '../components/assessment/assessmentShape';
import Playground, { IDispatchProps, IStateProps } from '../components/Playground';
import { IState } from '../reducers/states';

const mapStateToProps: MapStateToProps<IStateProps, {}, IState> = state => ({
  activeTab: state.workspaces.playground.sideContentActiveTab,
  editorWidth: state.workspaces.playground.editorWidth,
  editorValue: state.workspaces.playground.editorValue!,
  editorBreakpoints: state.workspaces.playground.editorBreakpoints,
  editorHighlights: state.workspaces.playground.editorHighlights,
  isEditorAutorun: state.workspaces.playground.isEditorAutorun,
  isRunning: state.workspaces.playground.isRunning,
  isDebugging: state.workspaces.playground.isDebugging,
  debuggerActive: state.workspaces.playground.debuggerActive,
  debuggerAllowed: state.workspaces.playground.debuggerAllowed,
  output: state.workspaces.playground.output,
  queryString: state.playground.queryString,
  replValue: state.workspaces.playground.replValue,
  sideContentHeight: state.workspaces.playground.sideContentHeight,
  sourceChapter: state.workspaces.playground.context.chapter,
  externalLibraryName: state.workspaces.playground.playgroundExternal
});

const location: WorkspaceLocation = 'playground';

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      handleBrowseHistoryDown: () => browseReplHistoryDown(location),
      handleBrowseHistoryUp: () => browseReplHistoryUp(location),
      handleChangeActiveTab: (activeTab: number) => changeActiveTab(activeTab, location),
      handleChapterSelect: (chapter: number) => chapterSelect(chapter, location),
      handleEditorEval: () => evalEditor(location),
      handleEditorValueChange: (val: string) => updateEditorValue(val, location),
      handleSetEditorBreakpoint: (editorBreakpoints: string[]) => setBreakpointInEditor(editorBreakpoints, location),
      handleEditorWidthChange: (widthChange: number) => changeEditorWidth(widthChange, location),
      handleGenerateLz: generateLzString,
      handleInterruptEval: () => beginInterruptExecution(location),
      handleExternalSelect: (externalLibraryName: ExternalLibraryName) =>
        playgroundExternalSelect(externalLibraryName, location),
      handleReplEval: () => evalRepl(location),
      handleReplOutputClear: () => clearReplOutput(location),
      handleReplValueChange: (newValue: string) => updateReplValue(newValue, location),
      handleSideContentHeightChange: (heightChange: number) =>
        changeSideContentHeight(heightChange, location),
      handleToggleEditorAutorun: () => toggleEditorAutorun(location),
      handleDebuggerPause: () => beginDebuggerPause(location),
        handleDebuggerResume: (debuggerActive: boolean) => debuggerResume(location, debuggerActive),
        handleDebuggerNext: () => debuggerNext(location),
        handleDebuggerStepOver: () => debuggerStepOver(location),
        handleDebuggerStepOut: () => debuggerStepOut(location),
        handleDebuggerReset: () => debuggerReset(location),
        handleActivateDebugger: () => activateDebugger(location),
        handleDeactivateDebugger: () => deactivateDebugger(location),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Playground));
