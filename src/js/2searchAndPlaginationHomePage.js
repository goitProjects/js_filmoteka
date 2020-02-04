const searchFilmForm = document.querySelector('#js-form');
const searchFilmInput = document.querySelector('#js-input');
const backButton = document.querySelector('#js-backButton');
backButton.classList.add('main__hide');
const nextButton = document.querySelector('#js-nextButton');
let plaginationPageNumber = document.querySelector('#js-plaginationPageNumber');
let pError = document.querySelector('#js-error');
let inputValue = "";
let pageNumber = 1;

function fetchFilms() {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`)
    .then(data => data.json())
    .then(res => {
      if (res.results.length === 0) {
        pError.textContent = "Search result not successful. Enter the correct movie name and try again.";
      }
      if (res.results.length > 1) {
        moviesList.innerHTML = "";
        pError.textContent = "";
      }
      res.results.forEach(movie => {
        moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title, movie.id))
      })
      renderFilms = res.results;
      return renderFilms;
    })
    .catch(err => console.log(err));
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
