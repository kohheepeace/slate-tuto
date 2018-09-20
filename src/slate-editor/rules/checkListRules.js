import { Block, Text } from 'slate'
import { List } from 'immutable'
import BLOCKS from '../constants/blocks'

const checkListRules =
{
  deserialize (el) {
    if (el.tagName.toLowerCase() !== 'ul') return

    const isCheckList = el.childNodes[0].querySelector('input')

    const checkListItems = List(el.childNodes).map(line =>
      Block.create({
        type: isCheckList ? BLOCKS.CHECK_LIST_ITEM : BLOCKS.LIST_ITEM,
        nodes: [Text.create(line.innerText)]
      }))

    const checkList = Block.create({
      type: isCheckList ? BLOCKS.CHECK_LIST : BLOCKS.UL_LIST,
      nodes: checkListItems
    })

    return checkList
  }
}

export default checkListRules
