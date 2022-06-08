function populateNavBarIcons() {
    const page = window.location.pathname.substring(1);
    const link = (func, icon) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.onclick = func;
        const i = document.createElement('i');
        i.classList.add('material-icons');
        i.textContent = icon
        a.appendChild(i);
        li.appendChild(a);
        return li;
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