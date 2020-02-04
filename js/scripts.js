'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var moviesList = document.querySelector('#js-moviesList');
var renderFilms = [];
var genres;

function createCardFunc(imgPath, filmTitle, movieId) {
  var listItem = document.createElement('li');
  listItem.classList.add('main__filmListItem');
  listItem.setAttribute('id', 'js-filmListItem');
  var img = document.createElement('img');
  img.classList.add('main__filmListItemImg');
  img.setAttribute('src', "https://image.tmdb.org/t/p/w500/".concat(imgPath));
  var title = document.createElement('h2');
  title.classList.add('main__filmListItemTitle');
  title.textContent = filmTitle;
  listItem.append(img, title);
  listItem.addEventListener('click', function () {
    return activeDetailsPage(movieId, false);
  });
  return listItem;
}

;

var fetchPopularMoviesList = function fetchPopularMoviesList() {
  fetch("https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=".concat(pageNumber)).then(function (data) {
    return data.json();
  }).then(function (res) {
    if (res.results.length > 1) {
      moviesList.innerHTML = "";
    }

    res.results.forEach(function (movie) {
      moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title, movie.id));
    });
    renderFilms = res.results;
    return renderFilms;
  })["catch"](function (err) {
    return console.log(err);
  });
};

function fetchGenres() {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US').then(function (data) {
    return data.json();
  }).then(function (res) {
    genres = _toConsumableArray(res.genres);
  })["catch"](function (err) {
    return console.log(err);
  });
}

fetchPopularMoviesList();
fetchGenres();
"use strict";

var searchFilmForm = document.querySelector('#js-form');
var searchFilmInput = document.querySelector('#js-input');
var backButton = document.querySelector('#js-backButton');
backButton.classList.add('main__hide');
var nextButton = document.querySelector('#js-nextButton');
var plaginationPageNumber = document.querySelector('#js-plaginationPageNumber');
var pError = document.querySelector('#js-error');
var inputValue = "";
var pageNumber = 1;

function fetchFilms() {
  fetch("https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=".concat(pageNumber, "&include_adult=false&query=").concat(inputValue)).then(function (data) {
    return data.json();
  }).then(function (res) {
    if (res.results.length === 0) {
      pError.textContent = "Search result not successful. Enter the correct movie name and try again.";
    }

    if (res.results.length > 1) {
      moviesList.innerHTML = "";
      pError.textContent = "";
    }

    res.results.forEach(function (movie) {
      moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title, movie.id));
    });
    renderFilms = res.results;
    return renderFilms;
  })["catch"](function (err) {
    return console.log(err);
  });
}

function serchFilm(event) {
  event.preventDefault();
  inputValue = searchFilmInput.value;
  searchFilmForm.reset();
  fetchFilms();
}

searchFilmForm.addEventListener('submit', serchFilm);

function plaginationNavigation(e) {
  pageNumber === 1 || pageNumber < 1 ? backButton.classList.add('main__hide') : backButton.classList.remove('main__hide');

  if (e.target.id === "js-backButton") {
    pageNumber = pageNumber - 1;
    plaginationPageNumber.textContent = pageNumber;

    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  } else {
    pageNumber = pageNumber + 1;
    plaginationPageNumber.textContent = pageNumber;

    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  }

  pageNumber === 1 || pageNumber < 1 ? backButton.classList.add('main__hide') : backButton.classList.remove('main__hide');
}

backButton.addEventListener('click', plaginationNavigation);
nextButton.addEventListener('click', plaginationNavigation);
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var linkHomePage = document.querySelector('#js-linkHomePage');
var linkLibraryPage = document.querySelector('#js-linkLibraryPage');
var sectionHomePage = document.querySelector('#js-homePage');
var sectionLibraryPage = document.querySelector('#js-libraryPage');
var sectionDetailsPage = document.querySelector('#js-detailsPage');
var queueListButton = document.querySelector('#js-navigationLibraryButtonQueue');
var watchedListButton = document.querySelector('#js-navigationLibraryButtonWatched');
var addQueueButton = document.querySelector('#js-addQueueButton');
var addWatchedButton = document.querySelector('#js-addWatchedButton');
var logoH1 = document.querySelector('#js-logo');
var selectFilm = {};
sectionLibraryPage.classList.add('main__hide');
sectionDetailsPage.classList.add('main__hide');

function activeHomePage() {
  sectionLibraryPage.classList.add('main__hide');
  sectionDetailsPage.classList.add('main__hide');
  sectionHomePage.classList.remove('main__hide');
  backButton.addEventListener('click', plaginationNavigation);
  nextButton.addEventListener('click', plaginationNavigation);
  addQueueButton.removeEventListener('click', toggleToQueue);
  addWatchedButton.removeEventListener('click', toggleToWatched);
  queueListButton.removeEventListener('click', drawQueueFilmList);
  watchedListButton.removeEventListener('click', drawWatchedFilmList);
}

function activeLibraryPage() {
  sectionHomePage.classList.add('main__hide');
  sectionDetailsPage.classList.add('main__hide');
  sectionLibraryPage.classList.remove('main__hide');
  drawQueueFilmList();
  queueListButton.classList.add('main__navigationLibraryButtonActive');
  queueListButton.addEventListener('click', drawQueueFilmList);
  watchedListButton.addEventListener('click', drawWatchedFilmList);
  addQueueButton.removeEventListener('click', toggleToQueue);
  addWatchedButton.removeEventListener('click', toggleToWatched);
  backButton.removeEventListener('click', plaginationNavigation);
  nextButton.removeEventListener('click', plaginationNavigation);
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  sectionHomePage.classList.add('main__hide');
  sectionLibraryPage.classList.add('main__hide');
  sectionDetailsPage.classList.remove('main__hide');

  if (itsLibraryFilm) {
    var queueAndWatchedFilmListFromLS = [].concat(_toConsumableArray(JSON.parse(localStorage.getItem('filmsQueue'))), _toConsumableArray(JSON.parse(localStorage.getItem('filmsWatched'))));
    selectFilm = queueAndWatchedFilmListFromLS.find(function (el) {
      return el.id === movieId;
    });
  } else {
    selectFilm = renderFilms.find(function (el) {
      return el.id === movieId;
    });
  }

  showDetails(selectFilm);
  addQueueButton.addEventListener('click', toggleToQueue);
  addWatchedButton.addEventListener('click', toggleToWatched);
  queueListButton.removeEventListener('click', drawQueueFilmList);
  watchedListButton.removeEventListener('click', drawWatchedFilmList);
  backButton.removeEventListener('click', plaginationNavigation);
  nextButton.removeEventListener('click', plaginationNavigation);
}

;
linkHomePage.addEventListener('click', activeHomePage);
linkLibraryPage.addEventListener('click', activeLibraryPage);
logoH1.addEventListener('click', activeHomePage);
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function toggleToQueue() {
  var filmsQueueArr = [];
  var localStorageData = localStorage.getItem('filmsQueue');

  if (localStorageData !== null) {
    var _filmsQueueArr;

    (_filmsQueueArr = filmsQueueArr).push.apply(_filmsQueueArr, _toConsumableArray(JSON.parse(localStorageData)));
  }

  if (filmsQueueArr.find(function (el) {
    return el.id === selectFilm.id;
  })) {
    filmsQueueArr = filmsQueueArr.filter(function (el) {
      return el.id !== selectFilm.id;
    });
  } else {
    filmsQueueArr.push(selectFilm);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArr));
  monitorButtonStatusText();
}

;

function toggleToWatched() {
  var filmsWatchedArr = [];
  var localStorageData = localStorage.getItem('filmsWatched');

  if (localStorageData !== null) {
    var _filmsWatchedArr;

    (_filmsWatchedArr = filmsWatchedArr).push.apply(_filmsWatchedArr, _toConsumableArray(JSON.parse(localStorageData)));
  }

  if (filmsWatchedArr.find(function (el) {
    return el.id === selectFilm.id;
  })) {
    filmsWatchedArr = filmsWatchedArr.filter(function (el) {
      return el.id !== selectFilm.id;
    });
  } else {
    filmsWatchedArr.push(selectFilm);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
  monitorButtonStatusText();
}

;

function showDetails(selectFilm) {
  var img = document.querySelector('#js-detailsImg');
  img.setAttribute('src', "https://image.tmdb.org/t/p/w500/".concat(selectFilm.poster_path));
  var title = document.querySelector('#js-detailsTitle');
  title.textContent = selectFilm.title;
  var tdVote = document.querySelector('#js-vote');
  tdVote.textContent = selectFilm.vote_average;
  var tdPopularity = document.querySelector('#js-popularity');
  tdPopularity.textContent = selectFilm.popularity;
  var tdOriginalTitle = document.querySelector('#js-originalTitle');
  tdOriginalTitle.textContent = selectFilm.original_title;
  var tdGenre = document.querySelector('#js-genre');
  tdGenre.textContent = String(genres.filter(function (el) {
    return selectFilm.genre_ids.find(function (item) {
      return el.id === item;
    }) ? true : false;
  }).reduce(function (acc, item) {
    return acc + "".concat(item.name, ", ");
  }, '')).slice(0, -2);
  var detailsAboutText = document.querySelector('#js-detailsAboutText');
  detailsAboutText.textContent = selectFilm.overview;
  monitorButtonStatusText();
}

;

function monitorButtonStatusText() {
  var localStorageFilmsQueue = localStorage.getItem('filmsQueue');
  localStorageFilmsQueue === null ? addQueueButton.textContent = "Add to queue" : JSON.parse(localStorageFilmsQueue).find(function (el) {
    return el.id === selectFilm.id;
  }) ? addQueueButton.textContent = "Delete from queue" : addQueueButton.textContent = "Add to queue";
  var localStorageFilmsWatched = localStorage.getItem('filmsWatched');
  localStorageFilmsWatched === null ? addWatchedButton.textContent = "Add to watched" : JSON.parse(localStorageFilmsWatched).find(function (el) {
    return el.id === selectFilm.id;
  }) ? addWatchedButton.textContent = "Delete from watched" : addWatchedButton.textContent = "Add to watched";
}
"use strict";

var libraryFilmList = document.querySelector('#js-libraryFilmList');

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  var listItem = document.createElement('li');
  listItem.classList.add('main__filmListItem');
  listItem.setAttribute('id', 'js-filmListItem');
  var img = document.createElement('img');
  img.classList.add('main__filmListItemImg');
  img.setAttribute('src', "https://image.tmdb.org/t/p/w500/".concat(imgPath));
  var title = document.createElement('h2');
  title.classList.add('main__filmListItemTitle');
  title.textContent = filmTitle;
  var voteAverageH3 = document.createElement('h3');
  voteAverageH3.classList.add('main__filmVote');
  voteAverageH3.textContent = voteAverage;
  listItem.append(img, title, voteAverageH3);
  listItem.addEventListener('click', function () {
    return activeDetailsPage(movieId, true);
  });
  return listItem;
}

;

function drawQueueFilmList() {
  var fragment = document.createDocumentFragment();
  var queueFilmListFromLS = localStorage.getItem('filmsQueue');

  if (queueFilmListFromLS !== null && JSON.parse(queueFilmListFromLS).length !== 0) {
    JSON.parse(queueFilmListFromLS).forEach(function (movie) {
      fragment.append(createLibraryCardFunc(movie.backdrop_path, movie.title, movie.id, movie.vote_average));
    });
    libraryFilmList.innerHTML = "";
    libraryFilmList.append(fragment);
  } else if (queueFilmListFromLS === null || JSON.parse(queueFilmListFromLS).length === 0) {
    libraryFilmList.innerHTML = "";
    var listItem = document.createElement('li');
    listItem.classList.add('main__noFilmsInList');
    listItem.textContent = "You do not have to queue movies to watch. Add them.";
    libraryFilmList.append(listItem);
  }

  queueListButton.classList.add('main__navigationLibraryButtonActive');
  watchedListButton.classList.remove('main__navigationLibraryButtonActive');
}

function drawWatchedFilmList() {
  var fragment = document.createDocumentFragment();
  var watchedFilmListFromLS = localStorage.getItem('filmsWatched');

  if (watchedFilmListFromLS !== null && JSON.parse(watchedFilmListFromLS).length !== 0) {
    JSON.parse(watchedFilmListFromLS).forEach(function (movie) {
      fragment.append(createLibraryCardFunc(movie.backdrop_path, movie.title, movie.id, movie.vote_average));
    });
    libraryFilmList.innerHTML = "";
    libraryFilmList.append(fragment);
  } else if (watchedFilmListFromLS === null || JSON.parse(watchedFilmListFromLS).length === 0) {
    libraryFilmList.innerHTML = "";
    var listItem = document.createElement('li');
    listItem.classList.add('main__noFilmsInList');
    listItem.textContent = "You do not have watched movies. Add them.";
    libraryFilmList.append(listItem);
  }

  queueListButton.classList.remove('main__navigationLibraryButtonActive');
  watchedListButton.classList.add('main__navigationLibraryButtonActive');
}