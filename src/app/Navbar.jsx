import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import Bold from '../slate-editor/icons/Bold'
import Code from '../slate-editor/icons/Code'
import Italic from '../slate-editor/icons/Italic'
import Underline from '../slate-editor/icons/Underline'
import Strikethrough from '../slate-editor/icons/Strikethrough'
import Highlight from '../slate-editor/icons/Highlight'

import Table from '../slate-editor/icons/Table'
import Hr from '../slate-editor/icons/Hr'
import Blockquote from '../slate-editor/icons/Blockquote'
import Heading from '../slate-editor/icons/Heading'
import CodeBlock from '../slate-editor/icons/CodeBlock'
import OlList from '../slate-editor/icons/OlList'
import UlList from '../slate-editor/icons/UlList'
import CheckList from '../slate-editor/icons/CheckList'
import AlignLeft from '../slate-editor/icons/AlignLeft'
import AlignRight from '../slate-editor/icons/AlignRight'
import AlignCenter from '../slate-editor/icons/AlignCenter'

import s from './Navbar.scss'

function Navbar (props) {
  const { value, onChange } = props
  return (
    <AppBar position='fixed' color='inherit'>
      <Toolbar>
        <Typography variant='title' color='inherit' style={{ flex: 2 }}>
          Slate-Tuto
        </Typography>
        <div className={s.editorTools}>
          <Bold onChange={onChange} value={value} />
          <Code onChange={onChange} value={value} />
          <Italic onChange={onChange} value={value} />
          <Strikethrough onChange={onChange} value={value} />
          <Underline onChange={onChange} value={value} />
          <Highlight onChange={onChange} value={value} />
          <Table onChange={onChange} value={value} />
          <Hr onChange={onChange} value={value} />
          <Blockquote onChange={onChange} value={value} />
          <Heading level={1} onChange={onChange} value={value} />
          <Heading level={2} onChange={onChange} value={value} />
          <Heading level={3} onChange={onChange} value={value} />
          <CodeBlock onChange={onChange} value={value} />
          <OlList onChange={onChange} value={value} />
          <UlList onChange={onChange} value={value} />
          <CheckList onChange={onChange} value={value} />
          <AlignLeft onChange={onChange} value={value} />
          <AlignCenter onChange={onChange} value={value} />
          <AlignRight onChange={onChange} value={value} />
        </div>
        <Button color='primary' href='https://github.com/KohheePeace/slate-tuto'>Github</Button>
        <Button color='primary' href='https://kohhepeace.gitbook.io/project/~/edit/primary/'>Docs</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
