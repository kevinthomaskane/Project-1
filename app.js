

        genreHits("rap", ".drop-down-genre")
        genreHits("rock", ".drop-down-genre")
        genreHits("pop", ".drop-down-genre")
        genreHits("country", ".drop-down-genre")
        genreHits("edm", ".drop-down-genre")
        topHits();
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
                }
                );

$(document).on("click", ".genre", function(){
    var query = $(this).attr("id")
    console.log(query)
    function genreHits(query, dropdownGenreId) {
        $.ajax({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&tag=" + query + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
        }).done(function (data) {
            console.log(data)
            for (let i = 0; i < data.tracks.track.length; i++) {
                var obj = data.tracks.track[i].image[2];
                $(dropdownGenreId).append(`
                <a class='dropdown-button btn' href='#' data-activates='dropdown1'><img src="${obj[Object.keys(obj)[0]]}">${data.tracks.track[i].name} </a>
                    <ul id='dropdown1' class='dropdown-content'>
                        <li><a href="#!">one</a></li>
                        <li><a href="#!">two</a></li>
                        <li class="divider"></li>
                        <li><a href="#!">three</a></li>
                        <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                        <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                    </ul>
            
        `)
            }
        })
    }
})
    
    

    $(document).on("click", ".chip", function(){
        var query= $(this).text()
        console.log("hello")
        $(this).append(`
        <li>play video</li>
        <li>play video</li>
        <li>play video</li>
        `)
        }
        dropDownClick= true;

    })

    function topHits() {
        $.ajax({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
        }).done(function (data) {
            console.log(data)
            for (let i = 0; i < data.tracks.track.length; i++) {
                var icon = $("<i class='fas fa-play-circle'>") ;
                var obj = data.tracks.track[i].image[2];
                $(".drop-down-genre").append(`
        <div class="chip">
            <img src="${obj[Object.keys(obj)[0]]}">
                ${data.tracks.track[i].name} 
        </div>
        `)
            
            }
        })
    }