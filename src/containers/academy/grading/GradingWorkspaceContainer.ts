import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
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
  fetchGrading,
  setBreakpointInEditor,
  updateEditorValue,
  updateHasUnsavedChanges,
  updateReplValue,
  WorkspaceLocation
} from '../../../actions';
import {
  beginClearContext,
  resetWorkspace,
  updateCurrentSubmissionId
} from '../../../actions/workspaces';
import GradingWorkspace, {
  DispatchProps,
  OwnProps,
  StateProps
} from '../../../components/academy/grading/GradingWorkspace';
import { Library } from '../../../components/assessment/assessmentShape';
import { IState, IWorkspaceState } from '../../../reducers/states';

const workspaceLocation: WorkspaceLocation = 'grading';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, IState> = (state, props) => {
  return {
    activeTab: state.workspaces.grading.sideContentActiveTab,
    editorValue: state.workspaces.grading.editorValue,
    editorBreakpoints: state.workspaces.grading.editorBreakpoints,
    editorHighlights: state.workspaces.grading.editorHighlights,
    editorWidth: state.workspaces.grading.editorWidth,
    grading: state.session.gradings.get(props.submissionId),
    hasUnsavedChanges: state.workspaces.grading.hasUnsavedChanges,
    isRunning: state.workspaces.grading.isRunning,
    isDebugging: state.workspaces.grading.isDebugging,
    debuggerActive: state.workspaces.grading.debuggerActive,
    debuggerAllowed: state.workspaces.grading.debuggerAllowed,
    output: state.workspaces.grading.output,
    replValue: state.workspaces.grading.replValue,
    sideContentHeight: state.workspaces.grading.sideContentHeight,
    storedSubmissionId: state.workspaces.grading.currentSubmission,
    storedQuestionId: state.workspaces.grading.currentQuestion
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch<any>) =>
  bindActionCreators<DispatchProps>(
    {
      handleBrowseHistoryDown: () => browseReplHistoryDown(workspaceLocation),
      handleBrowseHistoryUp: () => browseReplHistoryUp(workspaceLocation),
      handleChangeActiveTab: (activeTab: number) => changeActiveTab(activeTab, workspaceLocation),
      handleChapterSelect: (chapter: any, changeEvent: any) =>
        chapterSelect(chapter, changeEvent, workspaceLocation),
      handleClearContext: (library: Library) => beginClearContext(library, workspaceLocation),
      handleEditorEval: () => evalEditor(workspaceLocation),
      handleEditorValueChange: (val: string) => updateEditorValue(val, workspaceLocation),
      handleSetEditorBreakpoint: (editorBreakpoints: string[]) => setBreakpointInEditor(editorBreakpoints, workspaceLocation),
      handleEditorWidthChange: (widthChange: number) =>
        changeEditorWidth(widthChange, workspaceLocation),
      handleGradingFetch: fetchGrading,
      handleInterruptEval: () => beginInterruptExecution(workspaceLocation),
      handleReplEval: () => evalRepl(workspaceLocation),
      handleReplOutputClear: () => clearReplOutput(workspaceLocation),
      handleReplValueChange: (newValue: string) => updateReplValue(newValue, workspaceLocation),
      handleResetWorkspace: (options: Partial<IWorkspaceState>) =>
        resetWorkspace(workspaceLocation, options),
      handleSideContentHeightChange: (heightChange: number) =>
        changeSideContentHeight(heightChange, workspaceLocation),
      handleUpdateCurrentSubmissionId: updateCurrentSubmissionId,
      handleUpdateHasUnsavedChanges: (unsavedChanges: boolean) =>
        updateHasUnsavedChanges(workspaceLocation, unsavedChanges),
        handleDebuggerPause: () => beginDebuggerPause(workspaceLocation),
        handleDebuggerResume: (debuggerActive: boolean) => debuggerResume(workspaceLocation, debuggerActive),
        handleDebuggerNext: () => debuggerNext(workspaceLocation),
        handleDebuggerStepOver: () => debuggerStepOver(workspaceLocation),
        handleDebuggerStepOut: () => debuggerStepOut(workspaceLocation),
        handleDebuggerReset: () => debuggerReset(workspaceLocation),
        handleActivateDebugger: () => activateDebugger(workspaceLocation),
        handleDeactivateDebugger: () => deactivateDebugger(workspaceLocation),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GradingWorkspace);
