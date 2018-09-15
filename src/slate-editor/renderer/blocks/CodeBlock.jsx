import React from 'react'
import Select from 'react-select'
import Input from 'material-ui/Input'
import '!style-loader!css-loader!react-select/dist/react-select.css'; /* eslint-disable-line */
import { languages } from 'prismjs/components.json'
import SlateEditCode from 'slate-edit-code'

import s from './CodeBlock.scss'

const syntaxList = Object.keys(languages).map(syntax => ({ label: syntax, value: syntax }))

export default class CodeBlock extends React.PureComponent {
  constructor (props) {
    super(props)

    const { node } = props
    const syntax = node.data.get('syntax')
    const filename = node.data.get('filename')

    this.state = {
      filename,
      syntax,
      isFilenameFocused: false
    }
  }

  onFilenameChange = (e) => {
    const filename = e.target.value

    this.setState({
      filename
    })
  }

  onSyntaxChange = (select) => {
    const syntax = select.value

    this.setState({
      syntax
    })

    this.saveData()
  }

  onFocus = (e) => {
    e.stopPropagation()
    this.setState({
      isFilenameFocused: true
    })
  }

  onBlur = () => {
    this.setState({
      isFilenameFocused: false
    })

    this.saveData()
  }

  saveData = () => {
    const { node, editor } = this.props
    const { syntax, filename } = this.state

    editor.change((c) => {
      c.setNodeByKey(node.key, {
        data: {
          syntax,
          filename
        }
      })
    })
  }

  addFilename = () => {
    this.setState({
      isFilenameFocused: true
    })
  }

  render () {
    const { isFilenameFocused, syntax, filename } = this.state

    const {
      attributes, children, editor
    } = this.props

    const { readOnly, value } = editor.props

    const isInCodeBlock = SlateEditCode().utils.isInCodeBlock(value)

    return (
      <div className={s.codeBlock} {...attributes}>
        {(isInCodeBlock && !filename && !isFilenameFocused) &&
          <div className='popupMenu' contentEditable={false}>
            <button className='addFilename' onClick={this.addFilename}>Add filename</button>
            <div className={s.syntax}>
              <Select
                placeholder='syntax'
                name='language'
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
              {readOnly
                ? <span>{filename.trim()}</span>
                : <Input
                  type='text'
                  autoFocus={isFilenameFocused}
                  value={filename || ''}
                  placeholder='filename'
                  style={{ fontSize: '.8rem' }}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onChange={this.onFilenameChange}
                />
              }
            </div>
            {!readOnly &&
              <div className={s.syntax}>
                <Select
                  placeholder='syntax'
                  name='language'
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
            top: -35px;
            display: flex;
            align-items: baseline;
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
    )
  }
}
