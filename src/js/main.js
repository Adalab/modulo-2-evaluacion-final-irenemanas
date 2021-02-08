'use strict';

const showsContainer = document.querySelector('.js-shows-container');
let shows;


// API

function getDataFromApi() {
  fetch('http://api.tvmaze.com/search/shows?q=girls')
    .then(response => response.json())
    .then(data => {
      shows = data;
      paintShows();
      setInLocalStorage();
    });

}

// LOCAL STORAGE

function setInLocalStorage() {
  const stringShows = JSON.stringify(shows);
  localStorage.setItem('data', stringShows);

}

function getFromLocalStorage() {
  const localStorageShows = localStorage.getItem('data');
  if (localStorageShows === null) {
    getDataFromApi();
  } else {
    const arrayShows = JSON.parse(localStorageShows);
    shows = arrayShows;
    paintShows();
  }
}

// PAINT

function paintShows() {
  console.log('pintando.....', shows);
  let htmlCode = ``;
  for (const show of shows) {
    console.log(show.show);
    htmlCode += `<li class="show">`;
    htmlCode += `<h2 class="show__title">${show.show.name}</h2>`;
    htmlCode += `<img src="http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg" alt="Cartel Serie"></img>`;
    htmlCode += `<li class="show">`;

  }
  showsContainer.innerHTML = htmlCode;
}


// START APP

getFromLocalStorage();