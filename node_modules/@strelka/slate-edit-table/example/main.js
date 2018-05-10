const React = require('react')
const createReactClass = require('create-react-class')
const ReactDOM = require('react-dom')
const { Value } = require('slate')
const { Editor } = require('slate-react')
const PluginEditTable = require('../lib/')
const { legacySchema } = require('../lib/utils/compat')

const valueJson = require('./value')

const tablePlugin = PluginEditTable()

const plugins = [
  tablePlugin
]

const schemaProps = legacySchema({
  nodes: {
    table: props => <table><tbody {...props.attributes}>{props.children}</tbody></table>,
    table_row: props => <tr {...props.attributes}>{props.children}</tr>,
    table_cell: (props) => <td {...props.attributes}>{props.children}</td>,
    paragraph: props => <p {...props.attributes}>{props.children}</p>,
    heading: props => <h1 {...props.attributes}>{props.children}</h1>
  }
})

const Example = createReactClass({
  getInitialState () {
    return {
      value: Value.fromJSON(valueJson)
    }
  },

  handleChange (change) {
    this.setState({
      value: change.value
    })
  },

  handleInsertTable () {
    const { value } = this.state

    this.handleChange(
      tablePlugin.changes.insertTable(value.change())
    )
  },

  handleInsertColumn () {
    const { value } = this.state

    this.handleChange(
      tablePlugin.changes.insertColumn(value.change())
    )
  },

  handleInsertRow () {
    const { value } = this.state

    this.handleChange(
      tablePlugin.changes.insertRow(value.change())
    )
  },

  handleRemoveColumn () {
    const { value } = this.state

    this.handleChange(
      tablePlugin.changes.removeColumn(value.change())
    )
  },

  handleRemoveRow () {
    const { value } = this.state

    this.handleChange(
      tablePlugin.changes.removeRow(value.change())
    )
  },

  handleRemoveTable () {
    const { value } = this.state

    this.handleChange(
      tablePlugin.changes.removeTable(value.change())
    )
  },

  renderNormalToolbar () {
    return (
      <div>
        <button onClick={this.handleInsertTable}>Insert Table</button>
      </div>
    )
  },

  renderTableToolbar () {
    return (
      <div>
        <button onClick={this.handleInsertColumn}>Insert Column</button>
        <button onClick={this.handleInsertRow}>Insert Row</button>
        <button onClick={this.handleRemoveColumn}>Remove Column</button>
        <button onClick={this.handleRemoveRow}>Remove Row</button>
        <button onClick={this.handleRemoveTable}>Remove Table</button>
      </div>
    )
  },

  render () {
    const { value } = this.state
    const isTable = tablePlugin.utils.isSelectionInTable(value)

    return (
      <div>
        {isTable ? this.renderTableToolbar() : this.renderNormalToolbar()}
        <Editor
          placeholder={'Enter some text...'}
          plugins={plugins}
          value={value}
          onChange={this.handleChange}
          {...schemaProps}
        />
      </div>
    )
  }
})

ReactDOM.render(
  <Example />,
  document.getElementById('example')
)
