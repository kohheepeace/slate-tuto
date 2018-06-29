import SlateEditCode from 'slate-edit-code';

const codeBlockRules =
{
  deserialize(el) {
    if (el.tagName.toLowerCase() !== 'pre') return;

    const codeBlock = SlateEditCode().utils.deserializeCode(el.innerText);

    return codeBlock;
  },
};

export default codeBlockRules;
