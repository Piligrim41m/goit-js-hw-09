import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.form')
form.addEventListener('submit', onSubmitForm)

function onSubmitForm(event) {
  event.preventDefault()
  let delay = Number(event.target.delay.value)
  const step = Number(event.target.step.value)
  const amount = Number(event.target.amount.value)
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
           Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay)
      });
    delay += step
  }
  form.reset()
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromis = {position, delay}
  return new Promise((resolve, reject) => {
  if (shouldResolve) {
    // Fulfill
    resolve(objectPromis)
  } else {
    // Reject
    reject(objectPromis)
    }
  })
}

