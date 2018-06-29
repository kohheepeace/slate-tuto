import INLINES from '../constants/inlines';

const linkRules =
{
  deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'a') {
      return {
        object: 'inline',
        type: INLINES.LINK,
        nodes: next(el.childNodes),
        data: {
          href: el.getAttribute('href'),
        },
      };
    }
  },
};

export default linkRules;
