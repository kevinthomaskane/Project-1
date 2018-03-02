

$(document).ready(function () {
    $('.collapsible').collapsible();
    $(".collapsible").hide();
    $('.slider').slider();

});

$(document).on("click", ".links", function () {
    $(".chart-list").empty();
    if ($(this).attr("id") === "current") {
        topHits();
    }
    else {
        var query = $(this).attr("id")
        console.log(query)
        genreHits(query)
    }
})

$(document).on("click", "#playYoutube", function () {
    var allText = $(this).parent().parent().text().trim();
    var array = allText.split("Play")
    console.log(array[0])
    youtubeCall(array[0])
})

var arrayOfFavorites = [];

$(document).on("click", "#addFavorite", function () {
    var allText = $(this).parent().parent().text().trim();
    var array = allText.split("Play")
    var playlistSong = array[0].toString().trim()
    console.log(playlistSong)
    arrayOfFavorites.push(playlistSong)
    localStorage.setItem("playlistSong", JSON.stringify(arrayOfFavorites))
    console.log(JSON.parse(localStorage.getItem("playlistSong")))
})

var arrayOfCommunity = [];

$(document).on("click", "#shareCommunity", function () {
    var allText = $(this).parent().parent().text().trim();
    var array = allText.split("Play")
    var communitySong = array[0]
    arrayOfCommunity.push(communitySong)
    localStorage.setItem("communitySong", JSON.stringify(arrayOfCommunity))
})

var searchParameter
var clicked = false;

if (!clicked) {
    $("#sideSearch").disabled("true");
} else {
    $("#sideSearch").disabled("false");
}


$(document).on("click", "#artistSearch", function () {
    searchParameter = $(this).text();
    clicked = true;
})

$(document).on("click", "#songSearch", function () {
    searchParameter = $(this).text();
    clicked = true;
})



$(document).on("click", "#searchSubmit", function () {
    var userInput = $("#sideSearch").val();
    if (searchParameter === "artist") {
        artistHits(userInput)
    }

    if (searchParameter === "song") {
        songHits(userInput)
    }
})

function genreHits(search) {
    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + search + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
    }).done(function (data) {
        $(".collapsible").empty();
        $(".collapsible").show();
        console.log(data)
        for (let i = 0; i < data.tracks.track.length; i++) {
            var obj = data.tracks.track[i].image[2];
            $(".collapsible").append(`
                 <li class="resultList">
                    <div class="collapsible-header truncate"><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} - ${data.tracks.track[i].artist.name}</div>
                     <div class="collapsible-body">
                     <a id="playYoutube" href="#"><i class="fab fa-youtube"></i>Play YouTube video</a> <br>
                     <a id="addFavorite" href="#"><i class="far fa-star"></i> <span >Add to your favorites</a><br>
                     <a id="shareCommunity" href="#"><i class="fas fa-share-alt"></i>Share with community</a>
                     </div>
                </li>     
             `)
        }
    })
}

function artistHits(search) {
    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=" + search + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
    }).done(function (data) {
        $(".collapsible").empty();
        $(".collapsible").show();
        console.log(data)
        for (let i = 0; i < data.tracks.track.length; i++) {
            var obj = data.tracks.track[i].image[2];
            $(".collapsible").append(`
                 <li class="resultList">
                    <div class="collapsible-header truncate"><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} - ${data.tracks.track[i].artist.name}</div>
                     <div class="collapsible-body">
                     <a href="#"><i class="fab fa-youtube"></i><span id="playYoutube"> Play YouTube video</span></a> <br>
                     <a href="#"><i class="far fa-star"></i> <span id="addFavorite">Add to your favorites </span></a><br>
                     <a href="#"><i class="fas fa-share-alt"></i> <span id="shareCommunity">Share with community </span></a>
                     </div>
                </li>     
             `)
        }
    })
}

function songHits(search) {
    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + search + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
    }).done(function (data) {
        $(".collapsible").empty();
        $(".collapsible").show();
        console.log(data)
        for (let i = 0; i < data.tracks.track.length; i++) {
            var obj = data.tracks.track[i].image[2];
            $(".collapsible").append(`
                 <li class="resultList">
                    <div class="collapsible-header truncate"><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} - ${data.tracks.track[i].artist.name}</div>
                     <div class="collapsible-body">
                     <a id="playYoutube" href="#"><i class="fab fa-youtube"></i> Play YouTube video</a> <br>
                     <a id="addFavorite" href="#"><i class="far fa-star"></i>Add to your favorites </a><br>
                     <a id="shareCommunity" href="#"><i class="fas fa-share-alt"></i>Share with community</a>
                     </div>
                </li>     
             `)
        }
    })
}

function topHits() {
    $.ajax({
        method: "GET",
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
    }).done(function (data) {
        $(".collapsible").empty();
        $(".collapsible").show();
        console.log(data)
        for (let i = 0; i < data.tracks.track.length; i++) {
            var obj = data.tracks.track[i].image[2];
            $(".collapsible").append(`
                     <li class="resultList">
                        <div class="collapsible-header truncate"><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} - ${data.tracks.track[i].artist.name}</div>
                         <div class="collapsible-body">
                        <a id="playYoutube" href="#"> <i class="fab fa-youtube"></i>Play YouTube video</a> <br>
                        <a id="playYoutube" href="#"> <i class="far fa-star"></i>Add to your favorites</a> <br>
                         <a id="playYoutube" href="#"><i class="fas fa-share-alt"></i>Share with community</a>
                         </div>
                    </li>
                 
        `)
        
            }
        })
    }

    





function youtubeCall(song){
        event.preventDefault();
        var search = song
        console.log(search);
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=1&q=" + search + "lyrics&type=video&key=AIzaSyAjjM5Zlo-im2fzE9Z6ewpsvBw9Q-DIPeo"
        $.ajax({
            method: "GET",
            url: queryURL
            
        }).done(function(data){
            var vidId = data.items[0].id.videoId;
            console.log(data);
            console.log(vidId);
            $(".slider").html('')
            $("#video-container").html("<blockquote class='embedly-card'><h4><a href='https://www.youtube.com/watch?v=" + vidId + "'></a></h4></blockquote>")
        });
        
    }
    
