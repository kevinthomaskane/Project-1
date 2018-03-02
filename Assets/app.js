

 $(document).ready(function(){
     $('.collapsible').collapsible();
     $(".collapsible").hide();
});

$(document).on("click", ".links", function(){
    $(".chart-list").empty();
    if ($(this).attr("id")=== "current"){
        topHits();
    }
    else{
    var query = $(this).attr("id")
    console.log(query)
    genreHits(query) 
    }
})

$(document).on("click", "#playYoutube", function(){
    var allText = $(this).parent().parent().text()
   var array =  allText.split("Play")
    console.log(array[0])
})

$(document).on("click", "#addFavorite", function(){
    var allText = $(this).parent().parent().text()
   var array =  allText.split("Play")
    console.log(array[0])
})

$(document).on("click", "#shareCommunity", function(){
    var allText = $(this).parent().parent().text()
   var array =  allText.split("Play")
    console.log(array[0])
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
                    <div class="collapsible-header"><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} - ${data.tracks.track[i].artist.name}</div>
                     <div class="collapsible-body">
                     <i class="fab fa-youtube"></i><span id="playYoutube"> Play YouTube video</span> <br>
                     <i class="far fa-star"></i> <span id="addFavorite">Add to your favorites </span><br>
                     <i class="fas fa-share-alt"></i> <span id="shareCommunity">Share with community </span>
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
                        <div class="collapsible-header"><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} - ${data.tracks.track[i].artist.name}</div>
                         <div class="collapsible-body">
                         <i class="fab fa-youtube"></i><span id="playYoutube"> Play YouTube video</span> <br>
                         <i class="far fa-star"></i> <span id="playYoutube">Add to your favorites </span><br>
                         <i class="fas fa-share-alt"></i> <span id="playYoutube">Share with community </span>
                         </div>
                    </li>
                 
        `)
        
            }
        })
    }