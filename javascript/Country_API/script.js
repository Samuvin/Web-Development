'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${data.population}</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[Object.keys(data.currencies)].name
        }</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// function GetCountry(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//     console.log(data.flags.png);

//     const neighbour = data.borders?.[0];
//     console.log(neighbour);
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       renderCountry(data, 'neighbour');
//     });
//   });
// }
// GetCountry('usa');

// const getCountrydata = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neigbours = data[0].borders[0];
//       console.log(neigbours);
//       if (!neigbours) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neigbours}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0], 'neighbour'));
// };
// getCountrydata('usa');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJson = function (url, ErrorMsg = 'Something Went wrong') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${ErrorMsg} (${res.status})`);
    return res.json();
  });
};

// const getCountrydata = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Hello`);
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neigbours = data[0].borders[0];
//       console.log(neigbours);
//       if (!neigbours) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neigbours}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Hello`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(err.message);
//       renderError(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', () => {
//   getCountrydata('usa');
// });

const getCountrydata = function (country) {
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country Not Found')
    .then(data => {
      renderCountry(data[0]);
      if (!data[0].borders) throw new Error('No Neighbor found!');
      const neigbours = data[0].borders[0];
      return getJson(
        `https://restcountries.com/v3.1/alpha/${neigbours}`,
        'Country Not Found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err.message);
      renderError(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

fetch(
  'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en'
)
  .then(res => res.json())
  .then(data => getCountrydata(data.countryName));

// getCountrydata('canada');
