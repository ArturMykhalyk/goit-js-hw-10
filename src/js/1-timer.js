// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = 0;
const buttonStart = document.querySelector('[data-start]');
buttonStart.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    buttonStart.setAttribute('disabled', '');
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        close: false,
        icon: 'fa-regular fa-circle-xmark',
        iconColor: 'gray',
      });
    } else {
      userSelectedDate = selectedDates[0];
      buttonStart.removeAttribute('disabled', '');
    }
  },
};

const inputDate = document.querySelector('#datetime-picker');
flatpickr(inputDate, options);

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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
const htmlDays = document.querySelector('[data-days]');
const htmlHours = document.querySelector('[data-hours]');
const htmlMinutes = document.querySelector('[data-minutes]');
const htmlSeconds = document.querySelector('[data-seconds]');

function startTimer() {
  inputDate.setAttribute('disabled', '');
  buttonStart.setAttribute('disabled', '');
  const intervalId = setInterval(() => {
    const timeNow = Date.now();
    const deltaTime = userSelectedDate - timeNow;
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        title: 'OK',
        message: 'Timer complete!',
        position: 'topRight',
      });
      inputDate.removeAttribute('disabled', '');

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    htmlDays.textContent = addLeadingZero(days);
    htmlHours.textContent = addLeadingZero(hours);
    htmlMinutes.textContent = addLeadingZero(minutes);
    htmlSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

buttonStart.addEventListener('click', startTimer);
