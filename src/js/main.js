'use strict';

let shows;


// API

function getDataFromApi() {
  fetch('http://api.tvmaze.com/search/shows?q=girls')
    .then(response => response.json())
    .then(data => {
      shows = data;
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
    console.log(shows);
  }
}



// START APP

getFromLocalStorage();