
// підключаємо бібліотеку
import throttle from 'lodash.throttle';


const formEl = document.querySelector('.feedback-form');
console.log(formEl);
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

//перевіряємо стан сховища при завантаженні сторінки
updateForm();


//відстежуємо події інпут та сабміт
formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.target;

  if (email.value === '' || message.value === '') {
    return window.alert('Будь ласка, заповніть необхідні поля форми');
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