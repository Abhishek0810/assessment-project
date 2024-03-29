var links = document.getElementsByClassName('cat');
var link = document.getElementsByClassName('count');
var posts = document.getElementById('posts');
var category = 'general';
var country = 'eg';
var news;
var term;
var searchinpu = document.getElementById('Search');
getNews(country, category);

function getNews(count, cat) {
    var ajaxRequest = new XMLHttpRequest();
    var url = 'https://newsapi.org/v2/top-headlines?country=' + count + '&category=' + cat + '&apiKey=bafc6082ec9045e58854e236ab2c1b73';
    ajaxRequest.open("GET", url);

    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            news = JSON.parse(ajaxRequest.response);
            news = news.articles
            displayNews();
            console.log(news);
        }
    }
    ajaxRequest.send();
}
searchinpu.addEventListener('keyup', function() {
    term = searchinpu.value;
    globalNewsSearch(term);
});

function globalNewsSearch(term) {
    var ajaxRequest = new XMLHttpRequest();
    var url = 'https://newsapi.org/v2/everything?q=' + term + '&apiKey=bafc6082ec9045e58854e236ab2c1b73';
    ajaxRequest.open("GET", url);

    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            news = JSON.parse(ajaxRequest.response);
            news = news.articles
            displayNews();
            console.log(news);
        }
    }
    ajaxRequest.send();
}


function displayNews() {
    var newsBox = "";
    for (var i = 0; i < news.length; i++) {

        newsBox += `<div class="col-md-3">
                        <div class="new pt-5">
                        <img src="` + news[i].urlToImage + `" class="img-fluid"/>
                            <h2>` + news[i].title + `</h2>
                            <p class="text-muted">` + news[i].description + `</p>
                        </div>
                    </div>`
    }
    posts.innerHTML = newsBox;
}
//get category
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function(e) {
        console.log(e.target.innerHTML);
        category = e.target.innerHTML;
        getNews(country, category);
    });

}
//get country
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function(e) {
        console.log(e.target.id);
        country = e.target.id;
        getNews(country, category);
    });

}
