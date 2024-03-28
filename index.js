let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Define your API key
let key = "your_key"; // Replace "your_api_key_here" with your actual API key

// function to fetch data from api
let getMovie = () => {
    let movieName = movieNameRef.value;
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    } else {
        let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`; // Fix the URL
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response == "True") {
                    result.innerHTML = `
                    <div class="info"> 
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star.png">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                ${data.Genre.split(",").map(genre => `<div>${genre}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch((error) => {
                result.innerHTML = `<h3 class="msg">Error Occurred: ${error}</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);