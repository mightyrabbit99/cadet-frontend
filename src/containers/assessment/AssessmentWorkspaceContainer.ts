import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  activateDebugger,
  beginClearContext,
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
  fetchAssessment,
  setBreakpointInEditor,
  submitAnswer,
  updateEditorValue,
  updateHasUnsavedChanges,
  updateReplValue
} from '../../actions';
import {
  resetWorkspace,
  updateCurrentAssessmentId,
  WorkspaceLocation
} from '../../actions/workspaces';
import { Library } from '../../components/assessment/assessmentShape';
import AssessmentWorkspace, {
  DispatchProps,
  OwnProps,
  StateProps
} from '../../components/assessment/AssessmentWorkspace';
import { IState, IWorkspaceState } from '../../reducers/states';

const mapStateToProps: MapStateToProps<StateProps, OwnProps, IState> = (state, props) => {
  return {
    activeTab: state.workspaces.assessment.sideContentActiveTab,
    assessment: state.session.assessments.get(props.assessmentId),
    editorValue: state.workspaces.assessment.editorValue,
    editorBreakpoints: state.workspaces.assessment.editorBreakpoints,
    editorHighlights: state.workspaces.assessment.editorHighlights,
    editorWidth: state.workspaces.assessment.editorWidth,
    hasUnsavedChanges: state.workspaces.assessment.hasUnsavedChanges,
    isRunning: state.workspaces.assessment.isRunning,
    isDebugging: state.workspaces.assessment.isDebugging,
    debuggerActive: state.workspaces.assessment.debuggerActive,
    debuggerAllowed: state.workspaces.assessment.debuggerAllowed,
    output: state.workspaces.assessment.output,
    replValue: state.workspaces.assessment.replValue,
    sideContentHeight: state.workspaces.assessment.sideContentHeight,
    storedAssessmentId: state.workspaces.assessment.currentAssessment,
    storedQuestionId: state.workspaces.assessment.currentQuestion
  };
};

const workspaceLocation: WorkspaceLocation = 'assessment';

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch<any>) =>
  bindActionCreators<DispatchProps>(
    {
      handleAssessmentFetch: fetchAssessment,
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
      handleInterruptEval: () => beginInterruptExecution(workspaceLocation),
      handleReplEval: () => evalRepl(workspaceLocation),
      handleReplOutputClear: () => clearReplOutput(workspaceLocation),
      handleReplValueChange: (newValue: string) => updateReplValue(newValue, workspaceLocation),
      handleResetWorkspace: (options: Partial<IWorkspaceState>) =>
        resetWorkspace(workspaceLocation, options),
      handleSave: submitAnswer,
      handleSideContentHeightChange: (heightChange: number) =>
        changeSideContentHeight(heightChange, workspaceLocation),
      handleUpdateHasUnsavedChanges: (hasUnsavedChanges: boolean) =>
        updateHasUnsavedChanges(workspaceLocation, hasUnsavedChanges),
      handleUpdateCurrentAssessmentId: updateCurrentAssessmentId,
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

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentWorkspace);
