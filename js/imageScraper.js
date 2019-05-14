function getImage(document) {
    const sourceWebsite = "https://www.pexels.com/";
    const sourceForImages = sourceWebsite + "search/desktop%20wallpaper/";
    
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(sourceForImages) + '&callback=?', function(data){
        console.log("Image sources:\n");
        console.log(getListOfImageSources(data, sourceWebsite, sourceForImages));
        
        pickImage(getListOfImageSources(data, sourceWebsite, sourceForImages));
        
    });
}

function pickImage(imageSources) {
    
    // Now to randomly select one using an anchor like the date.
    currentDate = new Date();
    var daysInMonth = getDaysInMonth(currentDate.getMonth(),
                                     currentDate.getYear());
    
    
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

