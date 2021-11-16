import { adFormElement } from './form.js';
import { showMessage } from './util.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((advertisements) => {
      if (advertisements) {
        onSuccess(advertisements);
      }
    })
    .catch((err) => {
      showMessage('load-error', err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        adFormElement.reset();
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
