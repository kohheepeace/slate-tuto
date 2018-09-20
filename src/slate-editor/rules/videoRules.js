import BLOCKS from '../constants/blocks'

const videoRules =
{
  deserialize (el, next) {
    if (el.tagName.toLowerCase() !== 'iframe') return

    return {
      object: 'block',
      type: BLOCKS.VIDEO,
      isVoid: true,
      nodes: next(el.childNodes),
      data: {
        src: el.getAttribute('src'),
        url: el.getAttribute('url')
      }
    }
  }
}

export default videoRules
