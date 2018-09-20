import MARKS from '../constants/marks'

const MARK_TAGS = {
  strong: MARKS.BOLD,
  em: MARKS.ITALIC,
  u: MARKS.UNDERLINE,
  del: MARKS.STRIKETHROUGH,
  code: MARKS.CODE,
  mark: MARKS.HIGHLIGHT
}

const markRules =
{
  deserialize (el, next) {
    const mark = MARK_TAGS[el.tagName.toLowerCase()]
    if (mark) {
      return {
        object: 'mark',
        type: mark,
        nodes: next(el.childNodes)
      }
    }
  }
}

export default markRules
