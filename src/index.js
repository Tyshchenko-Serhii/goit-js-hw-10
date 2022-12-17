import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

Notiflix.Notify.init({
  fontSize: '30px',
  width: '500px',
  borderRadius: '10px',
});

const DEBOUNCE_DELAY = 300;

const refs = {
  inputCountryElement: document.querySelector('#search-box'),
  litsCountresElement: document.querySelector('.country-list'),
};

const createDropList = cauntry => `<li class="country-list__item">
<img src="${cauntry.flags.svg}" alt="flag of ${cauntry.name.official}" width="50">
<h2>${cauntry.name.official}</h2></li>`;

const generateContent = array =>
  array.reduce((acc, cauntry) => acc + createDropList(cauntry), '');

const insertContent = array => {
  const result = generateContent(array);
  refs.litsCountresElement.insertAdjacentHTML('beforeend', result);
};

const createCautryCart = cauntry => {
  const cautryCard = `<div class="country-info">
        <div class="country">
            <img src="${cauntry.flags.svg}" alt="flag of ${
    cauntry.name.official
  }" class="country__flag">
            <h2 class="coutry__name">${cauntry.name.official}</h2>
        </div>
        <p><span>Capital:</span>${cauntry.capital}</p>
        <p><span>Population:</span>${cauntry.population}</p>
        <p><span>Languages:</span>${Object.values(cauntry.languages)}</p>
    </div>`;
  refs.litsCountresElement.insertAdjacentHTML('beforeend', cautryCard);
};

const clearList = () => {
  refs.litsCountresElement.innerHTML = '';
};

const filter = array => {
  if (array.length === 1) {
    clearList();
    return createCautryCart(array[0]);
  } else if (array.length <= 10 && array.length > 1) {
    clearList();
    insertContent(array);
  } else if (array.length >= 10) {
    clearList();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name 🤖'
    );
  } else {
    clearList();
    Notiflix.Notify.failure('Oops, there is no country with that name 😱');
  }
};

refs.inputCountryElement.addEventListener(
  'input',
  debounce(onInput, DEBOUNCE_DELAY)
);

function onInput(evn) {
  const searchName = evn.target.value.trim();
  if (searchName === '') {
    return;
  }
  fetchCountries(searchName)
    .then(data => {
      filter(data);
    })
    .catch(error => {
      console.log(error);
    });
}
