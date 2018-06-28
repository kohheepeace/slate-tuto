import React from 'react';
import Select from 'react-select';
import Input from 'material-ui/Input';
import '!style-loader!css-loader!react-select/dist/react-select.css'; /* eslint-disable-line */
import { languages } from 'prismjs/components.json';
import SlateEditCode from 'slate-edit-code';

import s from './CodeBlock.scss';

const syntaxList = Object.keys(languages).map(syntax => ({ label: syntax, value: syntax }));

export default class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFilenameFocused: false,
    };
  }

  onFilenameChange = (e) => {
    const filename = e.target.value;
    const { node, editor } = this.props;

    editor.change(c => c.setNodeByKey(node.key, { data: { filename } }));
  }

  onSyntaxChange = (select) => {
    const syntax = select.value;
    const { node, editor } = this.props;

    editor.change(c =>
      c.setNodeByKey(node.key, { data: { syntax } }));
  }

  onFocus = () => {
    this.setState({
      isFilenameFocused: true,
    });
  }

  onBlur = () => {
    this.setState({
      isFilenameFocused: false,
    });
  }

  addFilename = () => {
    this.setState({
      isFilenameFocused: true,
    });
  }

  render() {
    const { isFilenameFocused } = this.state;

    const {
      node, attributes, children, editor,
    } = this.props;

    const { readOnly, value } = editor.props;

    const syntax = node.data.get('syntax');
    const filename = node.data.get('filename');
    const isInCodeBlock = SlateEditCode().utils.isInCodeBlock(value);

    return (
      <div className={s.codeBlock} {...attributes}>
        {(isInCodeBlock && !filename && !isFilenameFocused) &&
          <div className="popupMenu" contentEditable={false}>
            <button className="addFilename" onClick={this.addFilename}>Add filename</button>
            <div className={s.syntax}>
              <Select
                placeholder="syntax"
                name="language"
                value={syntax}
                onChange={this.onSyntaxChange}
                searchable
                options={syntaxList}
                clearable={false}
              />
            </div>
          </div>
        }
        {(filename || isFilenameFocused) &&
          <div className={s.header} contentEditable={false}>
            <div className={s.filename}>
              {readOnly ?
                <span>{filename.trim()}</span>
                :
                <Input
                  type="text"
                  autoFocus={isFilenameFocused}
                  value={filename || ''}
                  placeholder="filename"
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onChange={this.onFilenameChange}
                />
              }
            </div>
            {!readOnly &&
              <div className={s.syntax}>
                <Select
                  placeholder="syntax"
                  name="language"
                  value={syntax}
                  onChange={this.onSyntaxChange}
                  searchable
                  options={syntaxList}
                  clearable={false}
                />
              </div>
            }
          </div>
        }
        <div className={s.content}>
          <pre>
            <code>
              {children}
            </code>
          </pre>
        </div>

        <style jsx>{`
          .popupMenu {
            font-size: .7rem;
            position: absolute;
            right: 0;
            top: -37px;
            display: flex;
            background: transparent;
          }

          button:focus {outline:0;}

          .addFilename {
            color: #aaa;
            cursor: pointer;
            border: none;
            background: transparent;
          }

          .addFilename:hover { 
            color: #000;
          }

          p {
            color: red;
          }

          .blue {
            color: blue;
          }
        `}
        </style>
      </div>
    );
  }
}
