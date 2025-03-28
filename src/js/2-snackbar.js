import iziToast from 'izitoast';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateRadios = document.querySelectorAll('input[name="state"]');

const createPromise = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(delay) : reject(delay);
    }, delay);
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const selectedState = [...stateRadios].find(radio => radio.checked)?.value;

  if (!selectedState) {
    iziToast.error({
      message: 'Please select a state!',
      position: 'topCenter',
      timeout: 3000,
    });
    return;
  }

  createPromise(delay, selectedState === 'fulfilled')
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        timeout: 5000,
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        timeout: 5000,
      });
    });

  form.reset();
});
