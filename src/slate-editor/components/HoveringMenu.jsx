import React from 'react'
import ReactDOM from 'react-dom'

import Bold from '../icons/Bold'
import Code from '../icons/Code'
import Italic from '../icons/Italic'
import Underline from '../icons/Underline'
import Strikethrough from '../icons/Strikethrough'
import Highlight from '../icons/Highlight'

import s from './HoveringMenu.scss'

import updateHoverMenuPosition from '../changes/updateHoverMenuPosition'

class HoveringMenu extends React.Component {
  constructor (props) {
    super(props)
    this.hoverMenuRef = React.createRef()
  }

  componentDidMount = () => {
    updateHoverMenuPosition(this.props.value, this.hoverMenuRef.current)
  }

  componentDidUpdate = () => {
    updateHoverMenuPosition(this.props.value, this.hoverMenuRef.current)
  }

  render () {
    const { value, onChange } = this.props

    const root = window.document.getElementById('app')

    return ReactDOM.createPortal(
      <div className={s.hoverMenu} ref={this.hoverMenuRef}>
        <Bold onChange={onChange} value={value} />
        <Code onChange={onChange} value={value} />
        <Italic onChange={onChange} value={value} />
        <Strikethrough onChange={onChange} value={value} />
        <Underline onChange={onChange} value={value} />
        <Highlight onChange={onChange} value={value} />
      </div>,
      root
    )
  }
}

export default HoveringMenu
