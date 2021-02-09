'use strict';



const ulShowsContainer = document.querySelector('.js-shows-container');
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

const defaultImg = '';

function paintShows() {
  console.log('pintando.....', shows);
  let htmlCode = ``;
  for (const show of shows) {
    console.log(show.show);
    const showTitle = show.show;
    htmlCode += `<li class="show">`;
    htmlCode += `<h2 class="show__title">${showTitle.name}</h2>`;
    const showImage = showTitle.image;
    if (showImage === null) {
      htmlCode += `<img src="$¨defaultImg}">`;
    } else {
      htmlCode += `<img src="${showImage.medium}" alt="Cartel Serie"></img>`;
    }
    htmlCode += `<li class="show">`;

  }
  ulShowsContainer.innerHTML = htmlCode;
}


// START APP

getFromLocalStorage();