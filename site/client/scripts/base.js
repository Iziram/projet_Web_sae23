function populateNavBarIcons() {
    const page = window.location.pathname.substring(1);
    const link = (func, icon) => {
        const a = document.createElement('a');
        a.onclick = func;
        const i = document.createElement('i');
        i.classList.add('material-icons');
        i.textContent = icon
        a.appendChild(i);
        return a;
    };
    switch (page) {
        case "index.php":
            document.getElementById('searchLI').appendChild(link(function () { openSearchSlide(); }, 'search'));
            document.getElementById('profileLI').appendChild(link(function () { openProfil(); }, 'account_circle'));
            break;
        case "insertion.php":
            document.getElementById('profileLI').appendChild(link(function () { openProfil(); }, 'account_circle'));
            break;
        case "modification.php":
            document.getElementById('profileLI').appendChild(link(function () { openProfil(); }, 'account_circle'));
            break;
        default:
            break
    }
}

function openProfil() {
    const slide = document.getElementById("profil");
    if (slide) {
        const instance = M.Sidenav.getInstance(slide);
        instance.open();
    }
}
function openSearchSlide() {
    const slide = document.getElementById("searchSlide");
    if (slide) {
        const instance = M.Sidenav.getInstance(slide);
        instance.open();
    }
}

/**
 * Cette fonction convertie une chaine de caractère (représentant des éléments html) en élément DOM utilisable par JavaScript
 * @param {String} html la chaine de caractère représentant les élémments html
 * @param {String} mode = "text/html" Le mode par défaut est en text/html mais il existe aussi d'autres modes comme le text/XML qui peut être utilisé
 * @returns un élément DOM 
 */
 function HTMLParser(html, mode = "text/html") {
    if (mode === "text/html") {
        /** le mode text/html nous renverras un document entier (balise html + balise body + balise éléments)
        * On doit donc ruser un peu pour récuppérer l'élément que l'on souhaite :
        * On prend le premier enfant du document : ( document -> <html/> )
        * Puis le dernier enfant de l'html : ( <html/> -> <body/> )
        * Et enfin le premier enfant du body : ( <body/> -> <element/> )
        */
        return new DOMParser().parseFromString(html, mode).firstChild.lastChild.firstChild
    } else {
        //Dans les autres cas le premier enfant sera directement l'élément
        return new DOMParser().parseFromString(html, mode).firstChild
    }
}