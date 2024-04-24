const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


  //selecting element
  const main = document.getElementById("main")
  const form = document.getElementById("form")
  const search = document.getElementById("search")
  const empty = document.querySelector(".empty")


//   console.log(main, form, search)
  // fetch movies from api

  async function getMovies(url) {
    const res = await fetch(url)
    //json
    const data = await res.json()
    // console.log(data)
    if (data.results.length > 1) {
      displayMovies(data.results)
    } else {
      empty.style.display = "block"
      main.innerHTML = ""
    }
  }

  getMovies(API_URL)

  function displayMovies(movies) {
    main.innerHTML = ``

    movies.forEach((movie) => {
        const { title, overview, vote_average, poster_path } = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
        <img src = '${IMG_PATH + poster_path}' alt = ${title} >
        <div class= 'movie-info'>
        <h3> ${title} </h3>
        <span class= '${checkRatings(vote_average)}'> ${vote_average} </span>
        </div>
        <div class = 'overview'>
            <h3>Overview</h3>
            ${overview}
        </div>;
        `
        main.appendChild(movieEl)
    })
  }

  function checkRatings(rate) {
    if(rate >= 8) {
      return "green"
    } else if (rate >= 5){
      return "orange"
    } else{
      return "red"
    }
  }

  //search movies 
  const hiddenSearch = document.querySelector('.hidden-search')
  const span = document.querySelector('.hidden-search span')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchValue = search.value.trim()
    console.log(searchValue)
    if (searchValue) {
      //get movies for them 

      span.textContent = searchValue
      hiddenSearch.style.display = "block"

      getMovies(SEARCH_API + searchValue)
      search.value = ""
    } else {
      //reload the page
      window.location.reload()
    }
  })

  //get the movies
  //display the movies
  //search functionality
  

  



