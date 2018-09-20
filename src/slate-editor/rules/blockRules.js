import BLOCKS from '../constants/blocks'

const BLOCK_TAGS = {
  p: BLOCKS.PARAGRAPH,
  ol: BLOCKS.OL_LIST,
  ul: BLOCKS.UL_LIST,
  li: BLOCKS.LIST_ITEM,
  table: BLOCKS.TABLE,
  th: BLOCKS.TABLE_CELL,
  tr: BLOCKS.TABLE_ROW,
  td: BLOCKS.TABLE_CELL,
  hr: BLOCKS.HR,
  blockquote: BLOCKS.BLOCKQUOTE,
  h1: BLOCKS.HEADING_1,
  h2: BLOCKS.HEADING_2,
  h3: BLOCKS.HEADING_3,
  h4: BLOCKS.HEADING_4,
  h5: BLOCKS.HEADING_5,
  h6: BLOCKS.HEADING_6
}

const blockRules =
{
  deserialize (el, next) {
    const block = BLOCK_TAGS[el.tagName.toLowerCase()]
    if (block) {
      return {
        object: 'block',
        type: block,
        nodes: next(el.childNodes)
      }
    }
  }
}

export default blockRules
