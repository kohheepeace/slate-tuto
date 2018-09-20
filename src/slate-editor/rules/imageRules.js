import BLOCKS from '../constants/blocks'

const imageRules =
{
  deserialize (el, next) {
    if (el.tagName.toLowerCase() !== 'img') return

    const src = el.getAttribute('src')
    return {
      object: 'block',
      type: BLOCKS.IMAGE,
      isVoid: true,
      nodes: next(el.childNodes),
      data: { src }
    }
  }
}

export default imageRules
