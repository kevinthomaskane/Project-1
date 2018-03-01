<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

    <style>
        .chip {
            height: 50px;
        }

        .chip img {
            height: 50px;
            width: 50px;
        }
    </style>
</head>

<body>
    <div class="drop-down-genre">

    </div>


    <script>

        genreHits("rap", ".drop-down-genre")
        // genreHits("rock", ".drop-down-genre")
        // genreHits("pop", ".drop-down-genre")
        // genreHits("country", ".drop-down-genre")
        // genreHits("edm", ".drop-down-genre")
        topHits();

        function genreHits(query, dropdownGenreId) {
            $.ajax({
                method: "GET",
                url: "http://ws.audioscrobbler.com/2.0/?method=tag.getweeklychartlist&tag=" + query + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
            }).done(function (data) {
                console.log(data)
                for (let i = 0; i < weeklychartlist.tracks.track.length; i++) {
                    var obj = data.tracks.track[i].image[2];
                    $(dropdownGenreId).append(`
            <div class="chip">
                 <img src="${obj[Object.keys(obj)[0]]}">
                    ${data.tracks.track[i].name}
            </div>
            `)
                }
            })
        }

        function topHits() {
            $.ajax({
                method: "GET",
                url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
            }).done(function (data) {
                console.log(data)
                for (let i = 0; i < data.tracks.track.length; i++) {
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






    </script>
</body>

</html>