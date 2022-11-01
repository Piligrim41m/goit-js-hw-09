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
let ms = 0
let selectedTime = null
let timerID = null
btnStart.disabled = true

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
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // let nowDate = new Date()
    if (selectedDates[0] < Date.now()) {
      console.log(alert("Please choose a date in the future"))
      selectedDates[0] = new Date();
    }
    btnStart.disabled = false
    selectedTime = selectedDates[0]
    
  }
}
const fp = flatpickr("#datetime-picker", options)

function onClickStart() {
  if (btnActive) {
        return;
  }
  btnActive = true;
  console.log('start')
  timerID = setInterval(() => {
    const nowDate = Date.now()
    ms = selectedTime - nowDate;
    if (ms <= 0) {
     return  stopTimer()
  }
    const timeElements = convertMs(ms)
    console.log('my object ->', timeElements)
    dataDays.textContent = timeElements.days
    dataHours.textContent = timeElements.hours
    dataMinutes.textContent = timeElements.minutes
    dataSeconds.textContent = timeElements.seconds
    
  }, 1000)
  
}

function stopTimer() {
  clearInterval(timerID);
}

btnStart.addEventListener('click', onClickStart)
