$(function () {
    GetResult("popular");
    var result;
    $(".links").on("click", function () {
        result = $(this).val();
        //   console.log(result);
        GetResult(result);
        var html1=`<h2>${result}</h2>`
    $(".movie-category").html(html1);
    });
});
function GetResult(result) {
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/${result}?api_key=1891ed41b44831ce7944db8af69be43c`,
        type: "GET",

        success: function (reponse) {
            var movieArray = reponse.results;
            var html = "";


            $.each(movieArray, function (index, item) {
                var votpercentage = (item.vote_average / 10.0) * 100;

                var summary = item.overview.substr(0, 50) + "...";
                let movieHtml = `<a href="about.html?id=${item.id}" target="_blank">
                <div class="movie-card">
                <div class="image">
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
                    <div class="percentage">
                        ${votpercentage.toFixed(0)}<span>%</span>
                    </div>
                </div>
                <div>
                <div class="movieName">${item.original_title}</div>
                <div class="releaseDate">${item.release_date}</div>
                <div class="summary">${summary}</div>
                </div>
            </div></a>`;
                html += movieHtml;
            });
            $(".movie-showing").html(html);
        },
        error: function (jqXHR, txtStatus, error) {
            console.log(error);
        },
    });
}