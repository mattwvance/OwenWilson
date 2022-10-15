const options = {method: 'GET', headers: {accept: 'application/json'}};

window.addEventListener("DOMContentLoaded", function() {
    getOwen()  
    getMovieList()
    document.getElementById("defaultOpen").click();
})

function getOwen() {
    fetch('https://owen-wilson-wow-api.herokuapp.com/wows/random', options)
        .then(response => response.json())
        .then(function(response) {
            console.log(response)
            var movie = response[0].movie
            var duration = response[0].movie_duration
            var currentWow = response[0].current_wow_in_movie
            var totalWows = response[0].total_wows_in_movie
            var timestamp = response[0].timestamp
            var character = response[0].character
            var details = document.getElementById('video-details')
            details.innerHTML = `Owen Wilson as ${character} in the movie <i>${movie}</i>. Wow number <b>${currentWow}</b> out of <b>${totalWows}</b> total wows.
                                <br> This wow occurs at timestamp ${timestamp}. The total duration of the film is ${duration}. Wow!`
            var video = document.getElementById('video')
            video.innerHTML = ''
            video.controls = true
            video.autoplay = true
            video.setAttribute('height', 'auto')
            video.setAttribute('width', '70%')
            var source = document.createElement('source')
            source.setAttribute('src', response[0].video['1080p'])
            video.appendChild(source)
        })
        .catch(err => console.error(err));
    console.log("TESTING")
}

function getMovieList() {
    fetch('https://owen-wilson-wow-api.onrender.com/wows/movies', options)
        .then(response => response.json())
        .then(function(response) {
            var list = document.getElementById('movie-list')
            for (var i = 0; i < response.length; ++i) {
                var listItem = document.createElement('li')
                listItem.innerHTML = response[i]
                list.appendChild(listItem)
            }
            console.log(response)
        })
        .catch(err => console.error(err));
}

function switchTab(event, tab) {
    var tabs = document.getElementsByClassName('tab-link')
    var video = document.getElementById('video-container')
    var list = document.getElementById('list-container')
    for (var i = 0; i < tabs.length; ++i) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    if (tab === 'list') {
        list.style.display = 'flex'
        video.style.display = 'none'
    } else if (tab === 'video') {
        list.style.display = 'none'
        video.style.display = 'flex'
    }
    event.currentTarget.className += ' active'
}