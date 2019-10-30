// eslint-disable-next-line import/prefer-default-export
export function scrollToBottom() {
  setTimeout(() => {
    const scrollContainer = document.getElementById('window__messages__container');
    const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;
    if (!isScrolledToBottom) { scrollContainer.scrollTop = scrollContainer.scrollHeight; }
  }, 201);
}
