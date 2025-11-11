
function vaihdaTaustakuva() {
    level = getUrlParameter('lvl');

    if (level == "halloween") {
        // document.get("bodyd").style.backgroundImage = "url(img/halloween-bg-do-not-use.jpg)";
        document.getElementById("bodyd").style.backgroundImage = "url(img/halloween-bg-do-not-use.jpg)";
    } else if (level == "joulu") {
        document.getElementById("bodyd").style.backgroundImage = "url(img/joulu.png)";
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


vaihdaTaustakuva();