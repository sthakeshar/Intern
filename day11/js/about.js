function getQueryStringValue(uri, key) {
	var regEx = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var matches = uri.match(regEx);
	return matches == null ? null : matches[1];
}

$(function () {
	let urlId = getQueryStringValue(window.location.href, "id");
	console.log(urlId);
	printDetail(urlId);
});

function printDetail(urlId) {
	// Replace the hardcoded movie details with the actual API call
	$.ajax({
		url: `https://api.themoviedb.org/3/movie/${urlId}?api_key=32f384dabbc0a42dcc5afe68a7e28f41&append_to_response=credits`,
		type: "GET",
		success: function (movie) {
			var html = `
			<div class="info" style="background-image: linear-gradient(rgba(37, 37, 37, 0.8), rgba(37, 37, 37, 0.8)), url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}');">
			  <div class="info-img"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"></div>
	  
			  <div class="info-details">
				<div>
				  <h2>${movie.title} <span style="font-weight: 50;">(${movie.release_date.substring(0, 4)})</span></h2>
		  
				  <ul class="movie-genre">
					<li class="r-rate">${movie.adult ? "R" : "PG"}</li>
					<li>${movie.release_date} (${movie.production_countries[0].iso_3166_1})</li>
					<li><span> . </span>${movie.genres.map((genre) => genre.name).join(", ")}</li>
					<li><span> . </span>${movie.runtime}m</li>
				  </ul>
				</div>
				<div>
				  <ul class="movie-icons">
					<li class="movie-rate">${Math.floor(movie.vote_average * 10)}%</li>
					<li class="user-score">User Score</li>
					<li class="img"><img
                                src="img/glyphicons-basic-159-thumbnails-list-white-c260ea972eebf812289fd3c41d0d2c1dff33ecbcd62be13fba8eeaf9de173789.svg">
                        </li>
                        <li class="img"><img
                                src="img/glyphicons-basic-13-heart-white-28d2cc2d6418c5047efcfd2438bfc5d109192671263c270993c05f130cc4584e.svg">
                        </li>
                        <li class="img"><img
                                src="img/glyphicons-basic-73-bookmark-white-432e98d550b7e4c80b06272c49475b0db85a60f6fae450420713004b3c9d3ffd.svg">
                        </li>
                        <li class="img"><img
                                src="img/glyphicons-basic-49-star-white-5c85220678b312aea9599d5f12ad858a9e7df226de51ef8b6b699023ffeda5fa.svg">
                        </li>
                        <li><img src="img/play-solid.svg"></li>
                        <li>Play Trailer</li>
				  </ul>
				</div>
				<div>
				  <h4>${movie.tagline || ""}</h4>
				  <h3>Overview</h3>
				  <p class="plot">${movie.overview}</p>
				</div>
				<div class="credit">
  ${movie.credits.crew
		.filter((crew) => ["Director", "Creator", "Screenplay", "Writer"].includes(crew.job))
		.map(
			(crew) => `
        <ul>
          <li class="name">${crew.name}</li>
          <li class="title">${crew.job}</li>
        </ul>
      `
		)
		.join("")}
</div>
			  </div>
			</div>
		  `;

			$("#movie-info").html(html);
		},
		error: function (jqXHR, txtStatus, error) {
			console.log(error);
		},
	});
}
