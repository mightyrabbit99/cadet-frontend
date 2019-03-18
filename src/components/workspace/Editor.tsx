import { EditorChangeEvent } from 'brace';
import * as React from 'react';
import AceEditor, { Annotation } from 'react-ace';
import { HotKeys } from 'react-hotkeys';

import 'brace/ext/searchbox';
import 'brace/mode/javascript';
import 'brace/theme/cobalt';


/**
 * @property editorValue - The string content of the react-ace editor
 * @property handleEditorChange  - A callback function
 *           for the react-ace editor's `onChange`
 * @property handleEvalEditor  - A callback function for evaluation
 *           of the editor's content, using `slang`
 */
export interface IEditorProps {
  isEditorAutorun?: boolean;
  editorValue: string;
  editorBreakpoints: string[];
  editorHighlights: number[][];
  handleEditorEval: () => void;
  handleSetEditorBreakpoint: (editorBreakpoints: string[]) => void;
  handleEditorValueChange: (newCode: string) => void;
  handleUpdateHasUnsavedChanges?: (hasUnsavedChanges: boolean) => void;
}

class Editor extends React.PureComponent<IEditorProps, {}> {
  private onChangeMethod: (newCode: string) => void;
  private onValidateMethod: (annotations: Annotation[]) => void;
  private ace: any;

  constructor(props: IEditorProps) {
    super(props);
    this.ace = React.createRef();
    this.onChangeMethod = (newCode: string) => {
      if (this.props.handleUpdateHasUnsavedChanges) {
        this.props.handleUpdateHasUnsavedChanges(true);
      }
      this.props.handleEditorValueChange(newCode);
    };
    this.onValidateMethod = (annotations: Annotation[]) => {
      if (this.props.isEditorAutorun && annotations.length === 0) {
        this.props.handleEditorEval();
      }
    };
  }

  public componentDidMount() {
    if(this.ace.current) {
      const editor: any = this.ace.current.editor;
      // get editor instance using (this.ace.current as any).editor
      // call editor.session.$breakpoints to get Array of breakpoint locations
      // for more functionalities, check https://ace.c9.io/#nav=api for documentations
      // especially under Editor, EditSession, Document
      // can only get editor instance after dom mounted
      const session = editor.session;

      // load breakpoints from previous session
      const previousBreakpoints = this.props.editorBreakpoints;
      for (let i = 0; i < previousBreakpoints.length; i++) {
        if (previousBreakpoints[i] != null) {
          session.setBreakpoint(i);
        }
      }
      // const doc = session.doc;

      // breakpoint auto-adjust logic
      editor.on('change', (delta: EditorChangeEvent) => {
        let len;
        let firstRow;
        let args;

        if (delta.end.row === delta.start.row) {
          return;
        }

        if (delta.action === 'insert') {
          len = delta.end.row - delta.start.row;
          firstRow = delta.start.column === 0 ? delta.start.row : delta.start.row + 1;
        } else {
          len = delta.start.row - delta.end.row;
          firstRow = delta.start.row;
        }

        if (len > 0) {
          args = Array(len);
          args.unshift(firstRow, 0);
          session.$breakpoints.splice.apply(session.$breakpoints, args);
        } else if (len < 0) {
          const rem = session.$breakpoints.splice(firstRow + 1, -len);
          if (!session.$breakpoints[firstRow]) {
            for (const oldBP in rem) {
              if (rem[oldBP]) {
                session.$breakpoints[firstRow] = rem[oldBP];
                break;
              }
            }
          }
        }
        this.props.handleSetEditorBreakpoint(session.$breakpoints);
      });

      // breakpoint toggling logic
      editor.on('gutterclick', (e: any) => {
        const target = e.domEvent.target;
        if (target.className.indexOf('ace_gutter-cell') === -1) {
          return;
        }
        if (!editor.isFocused()) {
          return;
        }
        if (e.clientX > 35 + target.getBoundingClientRect().left) {
          return;
        }

        let row = e.getDocumentPosition().row;
        let content = e.editor.session.getLine(row);
        const breakpoints = e.editor.session.getBreakpoints(row, 0);

        if (typeof breakpoints[row] === typeof undefined) {
          if(content.replace(/\s/g, '').substring(0,2) === "//" ) {
            while(content.replace(/\s/g, '').substring(0,2) === "//" && row < e.editor.session.$rowLengthCache.length) {
              row++;
              content = e.editor.session.getLine(row);
            }
          }
          if (typeof breakpoints[row] === typeof undefined && row < e.editor.session.$rowLengthCache.length) {
            if(content.length !== 0 && !content.includes("debugger;")) {
              e.editor.session.setBreakpoint(row);
            }
          }
        } else {
          e.editor.session.clearBreakpoint(row);
        }
        e.stop();
        this.props.handleSetEditorBreakpoint(e.editor.session.$breakpoints);
      });
    }
  }

  public getBreakpoints() {
    const breakpoints = (this.ace.current as any).editor.session.$breakpoints;
    const bps = [];
    for (let i = 0; i < breakpoints.length; i++) {
      if (breakpoints[i] != null) {
        bps.push(i);
      }
    }
    return bps;
  }

  public marker = () => {
    const markerProps= [];
    for(const lineNum of this.props.editorHighlights) {
      markerProps.push(
        {startRow: lineNum[0], startCol: 0, endRow: lineNum[1], endCol: 1, className: 'myMarker', type: 'fullLine' }
      );
    }
    return markerProps;
  };

  public render() {
    return (
      <HotKeys className="Editor" handlers={handlers}>
        <div className="row editor-react-ace">
          <AceEditor
            className="react-ace"
            commands={[
              {
                name: 'evaluate',
                bindKey: {
                  win: 'Shift-Enter',
                  mac: 'Shift-Enter'
                },
                exec: this.props.handleEditorEval
              }
            ]}
            editorProps={{
              $blockScrolling: Infinity
            }}
            ref={this.ace}
            markers={this.marker()}
            fontSize={14}
            height="100%"
            highlightActiveLine={false}
            mode="javascript"
            onChange={this.onChangeMethod}
            onValidate={this.onValidateMethod}
            theme="cobalt"
            value={this.props.editorValue}
            width="100%"
          />
        </div>
      </HotKeys>
    );
  }
}

/* Override handler, so does not trigger when focus is in editor */
const handlers = {
  goGreen: () => {}
};

export default Editor;
