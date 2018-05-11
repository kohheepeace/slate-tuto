import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import { Block } from 'slate';
import BLOCKS from '../constants/blocks';

const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create(BLOCKS.PARAGRAPH);
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
        default:
          break;
      }
    },
  },
};

export default schema;
