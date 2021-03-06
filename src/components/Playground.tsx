import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { RouteComponentProps } from 'react-router';
import { InterpreterOutput } from '../reducers/states';
import { LINKS } from '../utils/constants';
import { ExternalLibraryName } from './assessment/assessmentShape';
import Markdown from './commons/Markdown';
import Workspace, { WorkspaceProps } from './workspace';
import { SideContentTab } from './workspace/side-content';
import Inspector, { InspectorProps } from './workspace/side-content/Inspector';
import ListVisualizer from './workspace/side-content/ListVisualizer';

const CHAP = '\xa7';

const INTRODUCTION = `
Welcome to the Source Academy playground!

The language _Source_ is the official language of the textbook _Structure and
Interpretation of Computer Programs, JavaScript Adaptation_. You have never
heard of Source? No worries! It was invented just for the purpose of the book.
Source is a sublanguage of ECMAScript 2016 (7th Edition) and defined in [the
documents titled _"Source ${CHAP}x"_](${LINKS.SOURCE_DOCS}), where x refers to
the respective textbook chapter. For example, Source ${CHAP}3 is suitable for
textbook Chapter 3 and the preceeding chapters.

The playground comes with an editor and a REPL, on the left and right of the
screen, respectively. You may customise the layout of the playground by
clicking and dragging on the right border of the editor, or the top border of
the REPL.
`;

export interface IPlaygroundProps extends IDispatchProps, IStateProps, RouteComponentProps<{}> {}

export interface IStateProps {
  activeTab: number;
  editorValue: string;
  editorBreakpoints: string[];
  editorHighlights: number[][];
  editorWidth: string;
  isEditorAutorun: boolean;
  isRunning: boolean;
  isDebugging: boolean;
  debuggerActive: boolean;
  debuggerAllowed: boolean;
  output: InterpreterOutput[];
  queryString?: string;
  replValue: string;
  sideContentHeight?: number;
  sourceChapter: number;
  externalLibraryName: string;
}

export interface IDispatchProps {
  handleBrowseHistoryDown: () => void;
  handleBrowseHistoryUp: () => void;
  handleChangeActiveTab: (activeTab: number) => void;
  handleChapterSelect: (chapter: number) => void;
  handleEditorEval: () => void;
  handleEditorValueChange: (val: string) => void;
  handleSetEditorBreakpoint: (editorBreakpoints: string[]) => void;
  handleEditorWidthChange: (widthChange: number) => void;
  handleGenerateLz: () => void;
  handleInterruptEval: () => void;
  handleExternalSelect: (externalLibraryName: ExternalLibraryName) => void;
  handleReplEval: () => void;
  handleReplOutputClear: () => void;
  handleReplValueChange: (newValue: string) => void;
  handleSideContentHeightChange: (heightChange: number) => void;
  handleToggleEditorAutorun: () => void;
  handleDebuggerPause: () => void;
  handleDebuggerResume: (debuggerActive: boolean) => void;
  handleDebuggerNext: () => void;
  handleDebuggerStepOver: () => void;
  handleDebuggerStepOut: () => void;
  handleDebuggerReset: () => void;
  handleActivateDebugger: () => void;
  handleDeactivateDebugger: () => void;
}

type PlaygroundState = {
  isGreen: boolean;
};

class Playground extends React.Component<IPlaygroundProps, PlaygroundState> {
  private keyMap = { goGreen: 'h u l k' };

  private handlers = { goGreen: () => {} };

  constructor(props: IPlaygroundProps) {
    super(props);
    this.state = { isGreen: false };
    this.handlers.goGreen = this.toggleIsGreen.bind(this);
  }

  public render() {
    const inspectorProps: InspectorProps = {
      isRunning: this.props.isRunning,
      isDebugging: this.props.isDebugging,
      debuggerActive: this.props.debuggerActive,
      debuggerAllowed: this.props.debuggerAllowed,
      handleDebuggerNext: this.props.handleDebuggerNext,
      handleDebuggerResume: this.props.handleDebuggerResume,
      handleDebuggerStepOver: this.props.handleDebuggerStepOver,
      handleDebuggerStepOut: this.props.handleDebuggerStepOut
    };
    const workspaceProps: WorkspaceProps = {
      controlBarProps: {
        externalLibraryName: this.props.externalLibraryName,
        handleChapterSelect: ({ chapter }: { chapter: number }, e: any) =>
          this.props.handleChapterSelect(chapter),
        handleExternalSelect: ({ name }: { name: ExternalLibraryName }, e: any) =>
          this.props.handleExternalSelect(name),
        handleEditorEval: this.props.handleEditorEval,
        handleDebuggerPause: this.props.handleDebuggerPause,
        handleDebuggerResume: this.props.handleDebuggerResume,
        handleDebuggerReset: this.props.handleDebuggerReset,
        handleActivateDebugger: this.props.handleActivateDebugger,
        handleDeactivateDebugger: this.props.handleDeactivateDebugger,
        handleGenerateLz: this.props.handleGenerateLz,
        handleInterruptEval: this.props.handleInterruptEval,
        handleReplEval: this.props.handleReplEval,
        handleReplOutputClear: this.props.handleReplOutputClear,
        handleToggleEditorAutorun: this.props.handleToggleEditorAutorun,
        hasChapterSelect: true,
        hasEditorAutorunButton: true,
        hasSaveButton: false,
        hasShareButton: true,
        isEditorAutorun: this.props.isEditorAutorun,
        isRunning: this.props.isRunning,
        isDebugging: this.props.isDebugging,
        debuggerActive: this.props.debuggerActive,
        debuggerAllowed: this.props.debuggerAllowed,
        queryString: this.props.queryString,
        questionProgress: null,
        sourceChapter: this.props.sourceChapter
      },
      editorProps: {
        editorValue: this.props.editorValue,
        editorBreakpoints: this.props.editorBreakpoints,
        editorHighlights: this.props.editorHighlights,
        handleEditorEval: this.props.handleEditorEval,
        handleEditorValueChange: this.props.handleEditorValueChange,
        handleSetEditorBreakpoint: this.props.handleSetEditorBreakpoint,
        isEditorAutorun: this.props.isEditorAutorun
      },
      editorWidth: this.props.editorWidth,
      handleEditorWidthChange: this.props.handleEditorWidthChange,
      handleSideContentHeightChange: this.props.handleSideContentHeightChange,
      replProps: {
        output: this.props.output,
        replValue: this.props.replValue,
        handleBrowseHistoryDown: this.props.handleBrowseHistoryDown,
        handleBrowseHistoryUp: this.props.handleBrowseHistoryUp,
        handleReplEval: this.props.handleReplEval,
        handleReplValueChange: this.props.handleReplValueChange
      },
      sideContentHeight: this.props.sideContentHeight,
      sideContentProps: {
        activeTab: this.props.activeTab,
        handleChangeActiveTab: this.props.handleChangeActiveTab,
        tabs: [playgroundIntroductionTab, listVisualizerTab, inspectorTab(inspectorProps)]
      }
    };
    return (
      <HotKeys
        className={'Playground pt-dark' + (this.state.isGreen ? ' GreenScreen' : '')}
        keyMap={this.keyMap}
        handlers={this.handlers}
      >
        <Workspace {...workspaceProps} />
      </HotKeys>
    );
  }

  private toggleIsGreen() {
    this.setState({ isGreen: !this.state.isGreen });
  }
}

const playgroundIntroductionTab: SideContentTab = {
  label: 'Introduction',
  icon: IconNames.COMPASS,
  body: <Markdown content={INTRODUCTION} />
};

const listVisualizerTab: SideContentTab = {
  label: 'List Visualizer',
  icon: IconNames.EYE_OPEN,
  body: <ListVisualizer />
};

const inspectorTab = (inspectorProps: InspectorProps): SideContentTab => ({
  label: 'Inspector',
  icon: IconNames.SEARCH,
  body: <Inspector {...inspectorProps} />
});

export default Playground;
