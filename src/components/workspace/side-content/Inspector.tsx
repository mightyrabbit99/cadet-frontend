import { Tooltip } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import { controlButton } from '../../commons';
// import { createContext } from '../../../utils/slangHelper';

export type InspectorProps = {
  isRunning: boolean,
  isDebugging: boolean,
  debuggerActive: boolean,
  debuggerAllowed: boolean,
  handleDebuggerNext: () => void;
  handleDebuggerResume: (debuggerActive: boolean) => void;
  handleDebuggerStepOver: () => void;
  handleDebuggerStepOut: () => void;
};

class Inspector extends React.Component<InspectorProps, {}> {
  private $parent: HTMLElement | null;
  
  public componentDidMount() {
      if (this.$parent) {
        (window as any).Inspector.init(this.$parent);
      }
    }

  public render() {
    const resumeButton = controlButton('Resume', IconNames.STOP, () => this.props.handleDebuggerResume(this.props.debuggerActive), {}, !this.props.isDebugging);
    const nextButton = (
      <Tooltip content="click to proceed to the next step of evaluation" disabled={!this.props.isDebugging}>
        {controlButton('Next', IconNames.STOP, this.props.handleDebuggerNext, {}, !this.props.isDebugging)}
      </Tooltip>
    );
    const stepOverButton = (
      <Tooltip content="click to step over function call" disabled={!this.props.isDebugging}>
        {controlButton('StepOver', IconNames.STOP, this.props.handleDebuggerStepOver, {}, !this.props.isDebugging)}
      </Tooltip>
    );
    const stepOutButton = (
      <Tooltip content="click to step out of function call" disabled={!this.props.isDebugging}>
        {controlButton('StepOut', IconNames.STOP, this.props.handleDebuggerStepOut, {}, !this.props.isDebugging)}
      </Tooltip>
    );
    return (
        <div className="Inspector">
          <div className="pt-button-group">{resumeButton}{nextButton}{stepOverButton}{stepOutButton}</div>
          <div ref={r => (this.$parent = r)} className="sa-inspector" />
        </div>
    );
  }
}

export default Inspector;
