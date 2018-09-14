import BLOCKS from '../constants/blocks';

const insertImage = (change, src, target) => {
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: BLOCKS.IMAGE,
    isVoid: true,
    data: { src },
  });
};
export default insertImage;

