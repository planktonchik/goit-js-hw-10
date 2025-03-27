import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');

const dateTimePicker = document.querySelector('#datetime-picker');

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minsValue = document.querySelector('[data-minutes]');
const secsValue = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

let userSelectedDate = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  startBtn.classList.add('active');
  dateTimePicker.disabled = true;
  startTimer();
});

function startTimer() {
  const interval = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(interval);
      startBtn.classList.add('false');
      dateTimePicker.disabled = false;
      return;
    }

    updateTimer(convertMs(deltaTime));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysValue.textContent = addZero(days);
  hoursValue.textContent = addZero(hours);
  minsValue.textContent = addZero(minutes);
  secsValue.textContent = addZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2, '0');
}
