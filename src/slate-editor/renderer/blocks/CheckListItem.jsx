import React from 'react'
import s from './CheckListItem.scss'

export default function CheckListItem (props) {
  function onChange (e) {
    const { checked } = e.target
    const { editor, node } = props
    editor.change(c => c.setNodeByKey(node.key, { data: { checked } }))
  }

  const { attributes, children, node } = props
  const checked = node.data.get('checked') || false
  return (
    <li className={s.listItem} {...attributes}>
      <div
        className={s.checkBox}
        contentEditable={false}
      >
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className={s.content}>
        {children}
      </div>
    </li>
  )
}
