import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
console.log(formEl);
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

updateForm();

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.target;

  if (email.value === '' || message.value === '') {
    return window.alert('Please fill in all the fields!');
  }
  console.log({ Email: email.value, Message: message.value });
  formEl.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function updateForm() {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    return;
  }
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  Object.entries(savedForm).forEach(([name, value]) => {
    formData[name] = value;
    formEl.elements[name].value = value;
  });
}
