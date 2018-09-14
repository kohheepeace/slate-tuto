const updateHoverMenuPosition = (value, menu) => {
  if (!menu) return;

  if (value.isBlurred || value.isEmpty) {
    menu.removeAttribute('style');
    return;
  }

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  /* eslint-disable */
  menu.style.opacity = 1;
  menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
  menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  /* eslint-enable */
};

export default updateHoverMenuPosition;
