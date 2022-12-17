import Notiflix from 'notiflix';

export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return Promise.reject('Это ошибка 404');
    }
    return response.json();
  });
};
