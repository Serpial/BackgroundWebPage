var album_id = 'HBLU0';
var api_key = '67a07432bcebd9a';
var request_url = 'https://api.imgur.com/3/album/' + album_id;

function requestAlbum() {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(json) {
        if (req.readyState == 4 && req.status == 200) {
            // processRequest(req.responseText);
            if (req.responseText == "Not found") {
                console.log("Imgur album not found.");
            } else {
                useData(JSON.parse(req.responseText));
            }
        } else {
            console.log("Error with Imgur Request." + req.readyState+ ":" + req.status);
        }
    }
    
    req.open("GET", request_url, true); // true for asynchronous
    req.setRequestHeader('Authorization', 'Client-ID '+ api_key);
    req.send(null);
}

function useData(apiData) {
    // console.log(apiData)

    // Get value to assign the background based on day of year
    var d = new Date();
    var star = new Date(d.getFullYear(), 0, 0);
    var dif = (d - star) + ((star.getTimezoneOffset()- d.getTimezoneOffset())*60*100);
    var oneDay = 1000 * 60 * 60 * 24; // Second
    var day = Math.floor(dif/oneDay);

    var photoNum = day % apiData.data.images_count;


    // Change background
    var newBackground = apiData.data.images[photoNum].link;
    $(".form__background--image").attr("src",newBackground);
    console.log("Todays Background : " + newBackground);

    // Change footer
    $(".footer--link").text(apiData.data.account_url)
    $(".footer--link").attr("href","https://imgur.com/user/"+apiData.data.account_url)
}