import React from 'react';
import Select from 'react-select';
import Input from 'material-ui/Input';
import '!style-loader!css-loader!react-select/dist/react-select.css'; /* eslint-disable-line */
import { languages } from 'prismjs/components.json';

import s from './CodeBlock.scss';

const syntaxList = Object.keys(languages).map(syntax => ({ label: syntax, value: syntax }));

export default class CodeBlock extends React.PureComponent {
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

  render() {
    const {
      node, attributes, children, editor,
    } = this.props;
    const { readOnly } = editor.props;

    const syntax = node.data.get('syntax');
    const filename = node.data.get('filename');

    return (
      <div className={s.codeBlock} {...attributes}>
        <div className={s.header} contentEditable={false} >
          <div className={s.filename}>
            {readOnly ?
              <span>{filename.trim()}</span>
              :
              <Input
                type="text"
                value={filename || ''}
                placeholder="filename"
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
        <div className={s.content}>
          <pre>
            <code>
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}
