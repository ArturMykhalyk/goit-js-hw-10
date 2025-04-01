import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayUser = Number(delayInput.value);
  const radioBtnUser = document.querySelector('input[name="state"]:checked');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtnUser.value === 'fulfilled') {
        resolve(delayUser);
      } else {
        reject(delayUser);
      }
    }, delayUser);
  });

  promise
    .then(value => {
      iziToast.success({
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });

  form.reset();
});
