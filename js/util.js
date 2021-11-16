const showMessage = (name, error) => {
  const templateFragment = document.querySelector(`#${name}`).content;
  const template = templateFragment.querySelector(`.${name}`);
  const message = template.cloneNode(true);
  const button = message.querySelector(`.${name}__button`);
  if (error) {
    const messageText = message.querySelector(`.${name}__text`);
    messageText.textContent = error;
  }

  if (button) {
    button.addEventListener('click', () => {
      message.remove();
    }, { once: true });
  }

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.remove();
    }
  }, { once: true });

  document.body.appendChild(message);
};


export { showMessage };
