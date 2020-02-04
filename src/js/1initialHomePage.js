'use strict'

let moviesList = document.querySelector('#js-moviesList');
let renderFilms = [];
let genres;

function createCardFunc(imgPath, filmTitle, movieId) {
  const listItem = document.createElement('li');
  listItem.classList.add('main__filmListItem');
  listItem.setAttribute('id', 'js-filmListItem');

  const img = document.createElement('img');
  img.classList.add('main__filmListItemImg');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${imgPath}`)

  const title = document.createElement('h2');
  title.classList.add('main__filmListItemTitle');
  title.textContent = filmTitle;

  listItem.append(img, title);

  listItem.addEventListener('click', () => activeDetailsPage(movieId, false));
  return listItem;
};

const fetchPopularMoviesList = () => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${pageNumber}`)
    .then(data => data.json())
    .then(res => {
      if (res.results.length > 1) {
        moviesList.innerHTML = "";
      }
      res.results.forEach(movie => {
        moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title, movie.id))
      })
      renderFilms = res.results;
      return renderFilms;
    })
    .catch(err => console.log(err));
}

function fetchGenres() {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US')
    .then(data => data.json())
    .then(res => {
      genres = [...res.genres];
    })
    .catch(err => console.log(err));
}

fetchPopularMoviesList();
fetchGenres();
