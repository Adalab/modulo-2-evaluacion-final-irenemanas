'use strict';

let shows;
let favorites = [
  {
    score: 30.317333,
    show: {
      id: 161,
      url: 'http://www.tvmaze.com/shows/161/dexter',
      name: 'Dexter',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Crime', 'Mystery'],
      status: 'Running',
      runtime: 60,
      premiered: '2006-10-01',
      officialSite: 'http://www.sho.com/sho/dexter/home',
      schedule: { time: '21:00', days: ['Sunday'] },
      rating: { average: 8.5 },
      weight: 98,
      network: {
        id: 9,
        name: 'Showtime',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
      },
      webChannel: null,
      externals: { tvrage: 7926, thetvdb: 79349, imdb: 'tt0773262' },
      image: {
        medium:
          'http://static.tvmaze.com/uploads/images/medium_portrait/39/99907.jpg',
        original:
          'http://static.tvmaze.com/uploads/images/original_untouched/39/99907.jpg',
      },
      summary:
        '<p><b>Dexter</b> is a crime drama series based around the main character, a serial killer named Dexter Morgan. Dexter only kills other killers and criminals and works in blood splatter analysis at crime scenes.</p>',
      updated: 1611337523,
      _links: {
        self: { href: 'http://api.tvmaze.com/shows/161' },
        previousepisode: { href: 'http://api.tvmaze.com/episodes/11691' },
      },
    },
  },
];
const ulShowsContainer = document.querySelector(".js-shows-container");
const inputElement = document.querySelector(".js-input");
const buttonElement = document.querySelector(".js-button");

// API

function getDataFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + inputElement.value)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      paintShows();
      setInLocalStorage();
    });
}

// SEARCH TV-SHOW

function handleSearch() {
  getDataFromApi();
}

buttonElement.addEventListener("click", handleSearch);

// LOCAL STORAGE

function setInLocalStorage() {
  const stringShows = JSON.stringify(favorites);
  localStorage.setItem("data", stringShows);
}

function getFromLocalStorage() {
  const localStorageShows = localStorage.getItem("data");
  if (localStorageShows === null) {
    favorites = [];
  } else {
    const arrayShows = JSON.parse(localStorageShows);
    favorites = arrayShows;
    paintShows();
  }
}

// PAINT

const defaultImg = 'https://via.placeholder.com/210x295/ffffff/666666/?';

function paintShows() {
  let htmlCode = ``;
  for (const show of shows) {
    //console.log(show.show);
    const showTitle = show.show;
    htmlCode += `<li class="show">`;
    htmlCode += `<h2 class="show__title">${showTitle.name}</h2>`;
    const showImage = showTitle.image;
    if (showImage === null) {
      htmlCode += `<img src="${defaultImg}">`;
    } else {
      htmlCode += `<img src="${showImage.medium}" alt="Cartel Serie"></img>`;
    }
    htmlCode += `<li class="show">`;
  }
  ulShowsContainer.innerHTML = htmlCode;
}

// START APP

getFromLocalStorage();
