import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector("input[name='delay']");

function handleSubmitForm() {
  const delay = Number(delayInput.value);
  const checkedInput = document.querySelector("input[name='state']:checked");
  const state = checkedInput.value;

  if (!checkedInput) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please select a state',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })

    .catch(delay => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${delay}ms`,
      });
    });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  handleSubmitForm();
});
