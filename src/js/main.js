"use strict";

let shows = [];
let favourites = [];

const inputElement = document.querySelector(".js-input");
const buttonElement = document.querySelector(".js-button");

// API
function getDataFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + inputElement.value)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      paintShows();
    });
}

// SEARCH TV-SHOW
function handleSearch() {
  getDataFromApi();
}

buttonElement.addEventListener("click", handleSearch);

// LOCAL STORAGE
function setInLocalStorage() {
  const stringShows = JSON.stringify(favourites);
  localStorage.setItem("data", stringShows);
}

function getFromLocalStorage() {
  const localStorageShows = localStorage.getItem("data");
  if (localStorageShows === null) {
    favourites = [];
  } else {
    const arrayShows = JSON.parse(localStorageShows);
    favourites = arrayShows;
    paintFavourites();
  }
}

// PAINT SHOWS
const defaultImg = "https://via.placeholder.com/210x295/ffffff/666666/?";

function paintShows() {
  let htmlCode = ``;
  for (const serie of shows) {
    const showElement = serie.show;
    const index = favourites.findIndex((objeto) => objeto.show.id === showElement.id);
    if (index >= 0) {
      htmlCode += `<li class="show show-favourite js-show" id="${showElement.id}">`;
    } else {
      htmlCode += `<li class="show js-show" id="${showElement.id}">`;
    }
    htmlCode += `<h2 class="show__title">${showElement.name}</h2>`;
    const showImage = showElement.image;
    if (showImage === null) {
      htmlCode += `<img src="${defaultImg}">`;
    } else {
      htmlCode += `<img src="${showImage.medium}" alt="Cartel Serie"></img>`;
    }
    htmlCode += `</li>`;
  }
  const ulShowsContainer = document.querySelector(".js-shows-container");
  ulShowsContainer.innerHTML = htmlCode;
  listenShowEvents();
}

// LISTEN SHOW EVENTS
function listenShowEvents() {
  const favourites = document.querySelectorAll(".js-show");
  for (const favElement of favourites) {
    favElement.addEventListener("click", handleFavourite);
  }
}

// HANDLE FAVOURITES
function handleFavourite(ev) {
  const idShow = parseInt(ev.currentTarget.id);
  const indexShow = shows.findIndex((objeto) => objeto.show.id === idShow);
  const indexFavourites = favourites.findIndex((favourite) => favourite.show.id === idShow);
  if (indexFavourites === -1) {
    favourites.push(shows[indexShow]);
  } else {
    favourites.splice(indexFavourites, 1);
  }
  paintFavourites();
  paintShows();
  setInLocalStorage();
}

// PAINT FAVOURITES
function paintFavourites() {
  let htmlCode2 = ``;
  for (const favourite of favourites) {
    const favouriteElement = favourite.show;
    htmlCode2 += `<li class="favourite js-favourite" id="${favouriteElement.id}">`;
    htmlCode2 += `<h2 class="favourite__title">${favouriteElement.name}</h2>`;
    const favouriteImage = favouriteElement.image;
    if (favouriteImage === null) {
      htmlCode2 += `<img src="${defaultImg}">`;
    } else {
      htmlCode2 += `<img src="${favouriteImage.medium}" alt="Cartel Serie"></img>`;
    }
    htmlCode2 += `</li>`;
  }
  const ulFavouritesContainer = document.querySelector(".js-favourites-container");
  ulFavouritesContainer.innerHTML = htmlCode2;
}

// START APP
getFromLocalStorage();
