
function setBackground(document) {
    const sourceWebsite = "https://www.pexels.com/";
    const sourceForImages = sourceWebsite + "search/desktop%20wallpaper/";
    
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(sourceForImages) + '&callback=?', function(data){
        console.log("Image sources:\n");
        console.log(getListOfImageSources(data, sourceWebsite, sourceForImages));
        
        pickImage(getListOfImageSources(data, sourceWebsite, sourceForImages));
        
    });
}

function pickImage(imageSources) {
    
    /*
    // Now to randomly select one using an anchor like the date.
    currentDate = new Date();
    var daysInMonth = getDaysInMonth(currentDate.getMonth(),
                                     currentDate.getYear());
    */

    // For now we are just going to pick the first one
    var imageSource = imageSources[Math.floor((Math.random() * 10))];
    var creditName = "", creditLink = "", image = "";
    
    
    console.log("Chosen source : " + imageSource);
    
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(imageSource) + '&callback=?', function(data){
        // Get image
        image = getImage(data);

        $(".form__background--image").attr("src", image);

        creditLink = imageSource;
        creditName = getCredit(data);

        
        $(".footer--link").attr("href",creditLink);
        $(".footer--link").text(creditName);
        
    });
    
}

function getCredit(data) {
    const nameTag = "js-photo-page-mini-profile-full-name photo-page__mini-profile__text__title";
    const start = data.contents.indexOf(nameTag) + nameTag.length+2;
    return data.contents.substring(
        start,
        data.contents.indexOf("<", start)
    );

}

function getImage(data) {
    const imageClass = "js-photo-page-image-img";

    var imageElement = data.contents.substring(
        data.contents.indexOf(imageClass) - 12,
        data.contents.indexOf(">", data.contents.indexOf(imageClass) - 12)
    );
    var image = imageElement.substring(
        imageElement.indexOf("src='")+ "src='".length,
        imageElement.indexOf("'",imageElement.indexOf("src='")+ "src='".length+1)
    );
    
    console.log("Chosen image : " + image);
    return image;
}

function getListOfImageSources(data, sourceWebsite, sourceForImages) {
    const photoString= " href=\"/photo/";
    
    var content = data.contents.split("<div class='hide-featured-badge hide-favorite-badge'>");
    var imageSources = [];
    var startOfLocation = "", locationPiece = "", endOfLocation = "";
    var imageNumber = 0, contentIndex = 1;

    // Collect image locations to select
    while (imageNumber != 10) {
        contentIndex++;
        startOfLocation = content[contentIndex].indexOf(photoString)+photoString.length;
        endOfLocation = content[contentIndex].indexOf("/\">",startOfLocation);
        locationPiece = content[contentIndex].substring(startOfLocation, endOfLocation);
        
        if (locationPiece === "\n</div>\n") {
            continue;
        } else {
            imageSources[imageNumber] = sourceWebsite + "photo/";
            imageSources[imageNumber] += locationPiece;
            imageSources[imageNumber] += "/";
            imageNumber++;
        }
    }

    return imageSources;
}

