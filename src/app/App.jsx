import React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { blue } from 'material-ui/colors'

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Editor, getEventTransfer } from 'slate-react'
import { Value } from 'slate'
import initialData from '../slate-editor/initialData.json'
import renderMark from '../slate-editor/renderer/renderMark'
import renderNode from '../slate-editor/renderer/renderNode'
import plugins from '../slate-editor/plugins/index'
import onPasteText from '../slate-editor/changes/onPasteText'
import onPasteHtml from '../slate-editor/changes/onPasteHtml'
import HoveringMenu from '../slate-editor/components/HoveringMenu'
import schema from '../slate-editor/schema/index'

import Navbar from './Navbar'
import s from './App.scss'

const initialValue = Value.fromJSON(initialData)

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: '#EF5350' }
  }
})

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: initialValue
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onPaste = (e, change) => {
    const transfer = getEventTransfer(e)
    const { type } = transfer
    switch (type) {
      // case 'files': return this.handleOnDrop(files);
      case 'text': return onPasteText(e, change)
      case 'html': return onPasteHtml(e, change)
      default: break
    }
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          value={this.state.value}
          onChange={value => this.onChange(value)}
        />
        <HoveringMenu
          value={this.state.value}
          onChange={this.onChange}
        />
        <DragDropContextProvider backend={HTML5Backend}>
          <div className={s.container}>
            <div className={s.editor}>
              <Editor
                style={{ paddingBottom: 'calc(25rem - 100px)' }}
                value={this.state.value}
                onChange={this.onChange}
                onPaste={this.onPaste}
                renderMark={renderMark}
                renderNode={renderNode}
                plugins={plugins}
                schema={schema}
              />
            </div>
          </div>
        </DragDropContextProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
