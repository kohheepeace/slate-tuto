function hasBlock(value, type) {
  value.blocks.some(node => node.type === type);
}

export default hasBlock
