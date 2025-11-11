

let easyhtml = '';
for (x = 1; x < 11; x++) {

    if(x < 0) {
        easyhtml += '<a href="game.html?lvl=' + x + '" class="level-button">' + x + '<span class="level-name">Taso</span><span class="finished">🏅</span></a>';
    } else {
        easyhtml += '<a href="game.html?lvl=' + x + '" class="level-button">' + x + '<span class="level-name">Taso</span></a>';
    }

}

document.getElementById("easy-level-buttons").innerHTML = easyhtml;

let mediumhtml = '';
for (x = 11; x < 21; x++) {

    if(x == 1) {
        mediumhtml += '<a href="game.html?lvl=' + x + '" class="level-button">' + x + '<span class="level-name">Taso</span><span class="finished">🏅</span></a>';
    } else {
        mediumhtml += '<a href="game.html?lvl=' + x + '" class="level-button">' + x + '<span class="level-name">Taso</span></a>';
    }

}

// document.getElementById("medium-level-buttons").innerHTML = mediumhtml;

// let hardhtml = '';
// for (x = 21; x < 31; x++) {

//     if(x == 1) {
//         hardhtml += '<a href="game.html?lvl=' + x + '" class="level-button">' + x + '<span class="level-name">Taso</span><span class="finished">🏅</span></a>';
//     } else {
//         hardhtml += '<a href="game.html?lvl=' + x + '" class="level-button">' + x + '<span class="level-name">Taso</span></a>';
//     }

// }

// document.getElementById("hard-level-buttons").innerHTML = hardhtml;


let thisDate = new Date();
let thisMonth = thisDate.getMonth() + 1;

console.log("Kuu " + thisMonth)

/* <a href="game.html?lvl=halloween" class="season-level-button">1<span class="season-level-name">Kokeile pääsiäisen sanahuumaa</span></a> */
if (thisMonth == 4) {
    // let seasonLevelHtml = "";

    // seasonLevelHtml += '<div class="level-buttons">';
    // seasonLevelHtml += '<a href="game.html?lvl=paasiainen" id="paasiainen" class="season-level-button"><span class="season-level-name">PÄÄSIÄINEN</span></a>';
    // seasonLevelHtml += '</div>';

    // document.getElementById("seasonal-level-wrapper").innerHTML = seasonLevelHtml;
} else if (thisMonth == 6) {
    // let seasonLevelHtml = "";

    // seasonLevelHtml += '<div class="level-buttons">';
    // seasonLevelHtml += '<a href="game.html?lvl=kesa" id="kesa" class="season-level-button"><span class="season-level-name">KESKIKESÄ</span></a>';
    // seasonLevelHtml += '</div>';

    // document.getElementById("seasonal-level-wrapper").innerHTML = seasonLevelHtml;
} else if (thisMonth == 10) {
    let seasonLevelHtml = "";

    seasonLevelHtml += '<div class="level-buttons">';
    seasonLevelHtml += '<a href="game.html?lvl=halloween" id="halloween" class="season-level-button"><span class="season-level-name">HALLOWEEN</span></a>';
    seasonLevelHtml += '</div>';

    document.getElementById("seasonal-level-wrapper").innerHTML = seasonLevelHtml;
} else if (thisMonth == 11 || thisMonth == 12) {
    let seasonLevelHtml = "";

    seasonLevelHtml += '<div class="level-buttons">';
    seasonLevelHtml += '<a href="game.html?lvl=joulu" id="joulumaa" class="season-level-button"><span class="season-level-name">JOULUMAA</span></a>';
    seasonLevelHtml += '</div>';

    document.getElementById("seasonal-level-wrapper").innerHTML = seasonLevelHtml;
}

// let now = new Date();
// let kuu = now.getMonth() + 1;

// if(kuu == 1) {
//     document.getElementById("tammi").style.display = "block";
// } else if (kuu == 2) {
//     document.getElementById("helmi").style.display = "block";
// } else if (kuu == 3) {
//     document.getElementById("maalis").style.display = "block";
// } else if (kuu == 4) {
//     document.getElementById("huhti").classList.remove("hidden");
// } else if (kuu == 5) {

// } else if (kuu == 6) {

// } else if (kuu == 7) {

// } else if (kuu == 8) {

// } else if (kuu == 9) {

// } else if (kuu == 10) {

// } else if (kuu == 11) {

// } else if (kuu == 12) {

// } else {

// }