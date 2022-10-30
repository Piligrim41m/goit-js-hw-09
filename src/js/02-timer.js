import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]')
const timerRef = document.querySelector('.timer')
timerRef.style.display = 'flex';
timerRef.style.gap = '10px';

const fieldRef = document.querySelectorAll('.field')
fieldRef.forEach(function (field) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column'
  field.children[0].style = `font-size: 36px`
})
const dataDays = document.querySelector('span[data-days]')
const dataHours = document.querySelector('span[data-hours]')
const dataMinutes = document.querySelector('span[data-minutes]')
const dataSeconds = document.querySelector('span[data-seconds]')

let btnActive = false

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  let data
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return data = { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let nowDate = new Date()
    if (selectedDates[0] < nowDate) {
      return alert("Please choose a date in the future")
    }
    btnStart.addEventListener('click', onClickStart)
  }
}
const fp = flatpickr("#datetime-picker", options)

function onClickStart() {
  if (btnActive) {
        return;
  }
  btnActive = true;
  console.log('start')
  setInterval(() => {
    let nowDate = new Date()
    ms = fp.selectedDates[0] - nowDate;
    const timeElements = convertMs(ms)
    console.log('my object ->', timeElements)
    console.log(timeElements.days)
    dataDays.textContent = timeElements.days
    dataHours.textContent = timeElements.hours
    dataMinutes.textContent = timeElements.minutes
    dataSeconds.textContent = timeElements.seconds
  }, 1000)
}


