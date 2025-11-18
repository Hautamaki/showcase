// OnPageLoad, parse the URL for colors
window.onload = function() {
    parseUrl();
    //generateNewPalette();
};

let currentColorPalette;
let iscolor1Locked = false;
let iscolor2Locked = false;
let iscolor3Locked = false;
let iscolor4Locked = false;

let newHeadingColor;
let newBackgroundColor;
let newParagraphColor;
let newAccentColor;

let numberOfGeneratedPalettes = 0;
let currentUndoRedoStep = 1;

sessionStorage.removeItem('temporaryColors');
$("#undo-button").addClass("unavailable");
$("#redo-button").addClass("unavailable");



function parseUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlColors = urlParams.get('colors')

    let [urlHeadingColor, urlBackgroundColor, urlParagraphColor, urlAccentColor] = urlColors.split('-');

    newHeadingColor = urlHeadingColor;
    newBackgroundColor = urlBackgroundColor;
    newParagraphColor = urlParagraphColor;
    newAccentColor = urlAccentColor;

    setNewPaletteForHeading("#" + urlHeadingColor);
    setNewPaletteForBackground("#" + urlBackgroundColor);
    setNewParagraphColor("#" + urlParagraphColor);
    setNewAccentColor("#" + urlAccentColor);

    saveCurrentPaletteToTemporary(urlColors);

}

// Generate a color palette
function generateNewPalette() {
    // Change favorites icon back to normal incase last palette was added to favorites
    $('#add-to-favourite-button').attr('src', 'icons/empty-heart.svg');



    if(!iscolor1Locked) {
        newHeadingColor = generateTotallyRandomColor();
    }
    if(!iscolor2Locked) {
        newBackgroundColor = generateTotallyRandomColor();
    }
    if(!iscolor3Locked) {
        newParagraphColor = generateParagraphColor(newHeadingColor);
    }
    if(!iscolor4Locked) {
        newAccentColor = generateTotallyRandomColor();
    }


    setNewPaletteForHeading(newHeadingColor);
    setNewPaletteForBackground(newBackgroundColor);
    setNewParagraphColor(newParagraphColor);
    setNewAccentColor(newAccentColor);

    setNewUrl(newHeadingColor, newBackgroundColor, newParagraphColor, newAccentColor);
}

function lockThisColor(element) {
    let elementsId = $(element).attr("id");

    if(elementsId == 'color1') {
        iscolor1Locked = iscolor1Locked ? false : true;
        //console.log("IsColorLocked :" + iscolor1Locked + ", Selected path:", iscolor1Locked ? "icons/lock-opened.svg" : "icons/lock-closed.svg");
        $(element).attr("src", iscolor1Locked ? "icons/lock-closed.svg" : "icons/lock-opened.svg");
    }
    if(elementsId == 'color2') {
        iscolor2Locked = iscolor2Locked ? false : true;
        $(element).attr("src", iscolor2Locked ? "icons/lock-closed.svg" : "icons/lock-opened.svg");
    }
    if(elementsId == 'color3') {
        iscolor3Locked = iscolor3Locked ? false : true;
        $(element).attr("src", iscolor3Locked ? "icons/lock-closed.svg" : "icons/lock-opened.svg");
    }
    if(elementsId == 'color4') {
        iscolor4Locked = iscolor4Locked ? false : true;
        $(element).attr("src", iscolor4Locked ? "icons/lock-closed.svg" : "icons/lock-opened.svg");
        //$(element).attr("src", iscolor4Locked ? "icons/lock-opened.svg" : "icons/lock-closed.svg");
    }

    $(element).data('locked');

    // $(element).attr("src", "icons/lock-closed.svg")
}




// Set generated colors to HEADING elements
function setNewPaletteForHeading(newHeadingColor) {
    $(".color1-font").css("color", newHeadingColor);
    $(".color1-background").css("background-color", newHeadingColor);
    $(".color1-border").css("border-color", newHeadingColor);

    $("#floating-current-palette-color1").css("background-color", newHeadingColor);
    $("#floating-current-palette-color1").find("p").text(newHeadingColor);
}

// Set generated color to BACKGROUND element
function setNewPaletteForBackground(newBackgroundColor) {
    $(".color2-background").css("background-color", newBackgroundColor);
    $(".color2-font").css("color", newBackgroundColor);

    $("#floating-current-palette-color2").css("background-color", newBackgroundColor);
    $("#floating-current-palette-color2").find("p").text(newBackgroundColor);
}

// Set generated color to PARAGRAPH element
function setNewParagraphColor(newParagraphColor) {
    $(".color3-font").css("color", newParagraphColor);

    $("#floating-current-palette-color3").css("background-color", newParagraphColor);
    $("#floating-current-palette-color3").find("p").text(newParagraphColor);
}

function setNewAccentColor(newAccentColor) {
    $(".color4-background").css("background-color", newAccentColor);
    $(".color4-font").css("color", newAccentColor);
    $(".color4-border").css("border-color", newAccentColor);

    $("#floating-current-palette-color3").css("background-color", newAccentColor);
    $("#floating-current-palette-color3").find("p").text(newAccentColor);


    // Makes the images have nice color overlay with the generated accent color 
    $("head").append(`<style>
  .overlay-img::after {
    background-color: ${newAccentColor};
  }
</style>`);
}


function randomColor() {
    return ListForAllHeadingColors[Math.floor(Math.random()*ListForAllHeadingColors.length)];
}

function generateTotallyRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
    //return '#FF' + Math.floor(Math.random() * 16777215).toString(16);
    // This has fun color schemus but breaks on some parts
}

function generateParagraphColor(newHeadingColor) {
    let newParagraphColor = "#" + newHeadingColor.substring(1);
    return newParagraphColor;
}

function setNewUrl(color1, color2, color3, color4) {
    // Get current URL
    const url = new URL(window.location.href);

    // Get search parameters
    const params = new URLSearchParams(url.search);

    let newColorsUrl = color1.substring(1) + '-' + color2.substring(1) + '-' + color3.substring(1) + '-' + color4.substring(1);

    currentColorPalette = newColorsUrl;

    // Update the 'products' parameter
    params.set('colors', newColorsUrl);

    // Update the URL without reloading
    window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);

    saveCurrentPaletteToTemporary(newColorsUrl);
}

let ListForAllHeadingColors = ["#32746D", "#104F55", "#01200F", "#B57F50", "#8ED081", "#4B543B", "#000103", "#FF312E", "#333138", "#515052", "#BB0A21"];

// Add current color palette to temporarys for UNDO and REDO
function saveCurrentPaletteToTemporary(currentPalette) {
    if(!sessionStorage.getItem('temporaryColors')) {
        sessionStorage.setItem("temporaryColors", JSON.stringify([]));
    }
    let temporarys = JSON.parse(sessionStorage.getItem('temporaryColors'));
    temporarys.push(currentPalette);
    sessionStorage.setItem('temporaryColors', JSON.stringify(temporarys));

    console.log("Current palette :" + temporarys);

    currentUndoRedoStep = temporarys.length;
    console.log("Lenght: " + currentUndoRedoStep);

    if(currentUndoRedoStep > 1) {
        $("#undo-button").removeClass("unavailable");
    }
}


function undo(){
    console.log("Step kun painaa: " + currentUndoRedoStep);
    currentUndoRedoStep = currentUndoRedoStep - 1;
    
    if(currentUndoRedoStep < 1) {
        $("#undo-button").addClass("unavailable");
    } else {
        $("#undo-button").removeClass("unavailable");
        $("#redo-button").removeClass("unavailable");

        let temporaryColors = JSON.parse(sessionStorage.getItem('temporaryColors'));
        temporaryColors[currentUndoRedoStep];
    
        console.log("Current color: " + temporaryColors[currentUndoRedoStep] + ", " + currentUndoRedoStep + "/" + temporaryColors.length);

        let [headingC, bgC, paraC, accentC] = temporaryColors[currentUndoRedoStep].split('-');
        setNewPaletteForHeading("#" + headingC);
        setNewPaletteForBackground("#" + bgC);
        setNewParagraphColor("#" + paraC);
        setNewAccentColor("#" + accentC);

    }


}
function redo(){
    currentUndoRedoStep = currentUndoRedoStep + 1;
    let temporaryColors = JSON.parse(sessionStorage.getItem('temporaryColors'));
    
    if(currentUndoRedoStep >= temporaryColors.length) {
        $("#redo-button").addClass("unavailable");
    } else {
        $("#redo-button").removeClass("unavailable");

        console.log(currentUndoRedoStep);
        let temporaryColors = JSON.parse(sessionStorage.getItem('temporaryColors'));
        temporaryColors[currentUndoRedoStep];
    
        //console.log("COlor: " + temporaryColors[currentUndoRedoStep]);
        let [headingC, bgC, paraC, accentC] = temporaryColors[currentUndoRedoStep].split('-');
        setNewPaletteForHeading("#" + headingC);
        setNewPaletteForBackground("#" + bgC);
        setNewParagraphColor("#" + paraC);
        setNewAccentColor("#" + accentC);

    }
}

function deleteSessionStorage() {
    // Remove one specific key
    sessionStorage.removeItem('temporaryColors');
    console.log("Session data deleted.");
    currentUndoRedoStep = 0;
}

function deleteBrowserStorage(){
    localStorage.removeItem('favorites');
    console.log("Localdata deleted.");
    currentUndoRedoStep = 0;
}

// Create a function that lets user save palette as a favorite to browser storage
function addPaletteToFavorites() {
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    // Add a favourite
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites.includes(currentColorPalette)) {
      favorites.push(currentColorPalette);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log("Added " + currentColorPalette + "to favorites.")

      //Change favorite icon to indicate that the current palette is infact added to favorites.
        $('#add-to-favourite-button').attr('src', 'icons/full-heart.svg');
    }

    getFavorites();
}

// Remove a favorite
function removeFavorite(item) {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const updated = favorites.filter(fav => fav !== item);
    localStorage.setItem('favorites', JSON.stringify(updated));
}

// Get all favorites
function getFavorites() {
    let allFavorites = JSON.parse(localStorage.getItem('favorites'));

    if(allFavorites == "" || allFavorites == null){
        $("#listfavoritepalettes").empty();
        $("#listfavoritepalettes").append("<p class='small-text center-text'>No favourites yet!</p>");
        console.log("KAIKKI TYHJÄNÄ")
    } else {
        const $container = $("#listfavoritepalettes").empty();

        allFavorites.forEach(pair => {
            if (!pair || !pair.includes('-')) return; // Skip invalid entries
            
            const [bgColor, textColor] = pair.split('-');
            
            // Create div with background and text colors
            const $paletteDiv = $('<div>')
                .addClass('palette-item')
                .css({
                    'background-color': `#${textColor}`,
                    'color': `#${bgColor}`,
                    'width': '14px',
                    'height':'14px',
                    'margin': '5px',
                    'padding-top':'15px',
                    'padding-right':'2px',
                    'padding-bottom':'5px',
                    'padding-left':'20px',
                    'border-radius': '4px',
                    'display': 'inline-block'
                })
                .text('■');
            $paletteDiv.attr("id", pair);
            $paletteDiv.attr("onclick", "setSelectedPalette(this)");
    
            $container.append($paletteDiv);
        });
    }



    // $("#listfavoritepalettes").text(allFavorites.toString());
}

function getExplorePalettes() {
    let allExplores = [
        '3303fa-e3fdf0-3303fa-185d40',
        '2ea20a-7cf368-2ea20a-11594f',
        'bc9579-931629-bc9579-ef880f',
        'e3a3ff-fe0d25-e3a3ff-e26b5e',
        '7ced23-198f2e-7ced23-d7ddef',
        '236cc3-c0cbd0-236cc3-c92807',
        'e6dbf3-387f26-e6dbf3-ffd129',
        'd6edbf-5a06f4-d6edbf-f6e246',
        '202837-c371a5-202837-520f41',
        '202837-5ea883-202837-1d0d47',
        '9ff60e-5d099b-9ff60e-20d180',
        'b45188-d1f3c7-b45188-127999',
        'f707a3-1f3c7-f707a3-3750f0',
        '53c9d3-3567b6-53c9d3-a3ea1c',
        'c5c5ee-3567b6-c5c5ee-fbb708',
        'bcdc80-4805a3-bcdc80-e315b8',
        '5217e6-9fd1e0-5217e6-2517a4',
        'f33e48-d3de06-f33e48-342671'
    ]

    const $containers = $("#listexplorepalettes").empty();

    allExplores.forEach(pair => {
        // if (!pair || !pair.includes('-')) return; // Skip invalid entries
        
        const [bgColor, textColor] = pair.split('-');
        
        // Create div with background and text colors
        const $paletteDiv = $('<div>')
            .addClass('palette-item')
            .css({
                'background-color': `#${textColor}`,
                'color': `#${bgColor}`,
                'padding': '10px',
                'width': '15px',
                'height':'15px',
                'margin': '5px',
                'padding-right':'5px',
                'padding-left':'15px',
                'border-radius': '4px',
                'display': 'inline-block'
            })
            .text('■');
    $paletteDiv.attr("id", pair);
        $paletteDiv.attr("onclick", "setSelectedPalette(this)");

        $containers.append($paletteDiv);
    });
}

function setSelectedPalette(pairs) {
    let colorPalette = $(pairs).attr("id");

    let [urlHeadingColor, urlBackgroundColor, urlParagraphColor, urlAccentColor] = colorPalette.split('-');

    newHeadingColor = urlHeadingColor;
    newBackgroundColor = urlBackgroundColor;
    newParagraphColor = urlParagraphColor;
    newAccentColor = urlAccentColor;

    setNewPaletteForHeading("#" + urlHeadingColor);
    setNewPaletteForBackground("#" + urlBackgroundColor);
    setNewParagraphColor("#" + urlParagraphColor);
    setNewAccentColor("#" + urlAccentColor);
}

function openSettingsTab() {
    $('#floating-settings-menu').fadeToggle(500); // 500ms animation duration
    getFavorites();
    getExplorePalettes();
}

$('.menu-item').click(function() {
    $('.menu-item').removeClass('active');
    $(this).addClass('active');
    
    $('.page').hide();
    $('#' + $(this).data('target')).show();
});



