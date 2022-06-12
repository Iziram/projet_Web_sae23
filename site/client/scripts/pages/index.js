function promotionCarousel(promotions) {
    const carousel = document.getElementById('carousel')
    carousel.innerHTML = ""
    const promos = promotions.filter((el) => el.Promo == 1);
    if (promos.length > 0) {
        promos.forEach(element => {
            const a = document.createElement('a');
            a.classList.add('carousel-item');
            a.appendChild(productCard(element, true));

            carousel.appendChild(a);
        });
    } else {
        const a = document.createElement('a');
        a.classList.add('carousel-item');
        a.appendChild(productCard({}, true));

        carousel.appendChild(a);
    }

    M.Carousel.init(carousel, {
        dist: 0,
    });

}

function productCard(el, carousel = false) {
    const col = document.createElement('div');
    if (carousel) {
        col.classList.add('col');
    } else {
        col.classList.add('col', 's3');
    }

    const card = document.createElement('div');
    card.classList.add('card', 'small');
    const cardImg = document.createElement('div');
    cardImg.classList.add('card-image', 'waves-effect', 'waves-block', 'waves-light');
    const img = document.createElement('img');
    img.classList.add('activator', 'pdtImg');
    img.src = "server/images/" + el.image;
    img.alt = "L'image n'a pas pu être chargée";
    cardImg.appendChild(img);
    card.appendChild(cardImg);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    const contentTitle = document.createElement('span');
    contentTitle.textContent = el.NomP;
    contentTitle.classList.add('card-title', 'activator', 'grey-text', 'text-darken-4', 'center');
    cardContent.appendChild(contentTitle);
    card.appendChild(cardContent);



    let types = `<div class="row">
            <p class="col s6 center">${el.type}</p>
            <p class="col s6 center">${el.materiaux}</p>
        </div>`;
    if (carousel) types = "";

    let promo = `<span class="new badge red" data-badge-caption="Promotion"></span>`;
    if (!el.Promo) promo = "";
    const html = `
                <div class="card-reveal">
                ${promo}
                <div class="row">
                    <span class="card-title grey-text text-darken-4 col s12 center">${el.NomP}</span>
                </div>
                <hr>
                <div class="row">
                    <p class="col s12 center">${el.Prix.toFixed(2)}€</p>
                </div>
                <hr>
                ${types}
                </div>
                `;
    card.appendChild(HTMLParser(html));
    col.appendChild(card);

    return col;
}

function dynamicFilter() {
    const cat = productCategory();
    cat.then((value) => {
        const types = value.types.map((el) => el["type"]);
        const mat = value.materiaux.map((el) => el["materiaux"]);

        //Gestion des checkbox des materiaux
        const ulMat = document.getElementById('mat');
        ulMat.innerHTML = "";
        mat.forEach(function (el) {
            const p = document.createElement('p');
            p.classList.add("container");
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = "checkbox";
            input.classList.add('filled-in');
            const span = document.createElement('span');
            span.textContent = el;
            label.appendChild(input);
            label.appendChild(span);
            p.appendChild(label);
            ulMat.appendChild(p);
        });

        //Gestion des checkbox de type
        const ulType = document.getElementById('type');
        ulType.innerHTML = "";
        types.forEach(function (el) {
            const p = document.createElement('p');
            p.classList.add("container");
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = "checkbox";
            input.classList.add('filled-in');
            const span = document.createElement('span');
            span.textContent = el;
            label.appendChild(input);
            label.appendChild(span);
            p.appendChild(label);
            ulType.appendChild(p);
        });

        //Gestion du slider des prix
        const prixMax = parseFloat(value.prix.maxi.toFixed(2));
        const prixMin = parseFloat(value.prix.mini.toFixed(2));
        var slider = document.getElementById('test-slider');
        noUiSlider.create(slider, {
            start: [prixMin, prixMax],
            connect: true,
            orientation: 'horizontal',
            range: {
                'min': prixMin,
                'max': prixMax
            },
        });

        const mini = document.getElementById('min');
        const maxi = document.getElementById('max');
        mini.textContent = prixMin;
        maxi.textContent = prixMax;
        slider.noUiSlider.on('update', function (values, handle) {
            const value = values[handle];
            if (handle) {
                maxi.textContent = value + "€";
            } else {
                mini.textContent = value + "€";
            }

            const filter = getFilter(slider);
            const products = fullProducts();
            let filteredProducts = [];
            products.then(
                function (value) {
                    filteredProducts = value.filter(function (el) {
                        let t = true;
                        if (filter.types.length > 0) t = t && filter.types.includes(el.type);
                        if (filter.materiaux.length > 0) t = t && filter.materiaux.includes(el.materiaux);
                        t = t && (filter.prix[0] <= el.Prix) && (filter.prix[1] >= el.Prix);
                        return t
                    });
                    showProducts(filteredProducts);
                },
                (value) => {
                    console.error(value);
                }
            );
        });


        const checkboxes = Array.from(document.getElementsByClassName('filled-in'));
        checkboxes.forEach((el) => {
            el.addEventListener('click', function () {
                const filter = getFilter(slider);
                const products = fullProducts();
                let filteredProducts = [];
                products.then(
                    function (value) {
                        filteredProducts = value.filter(function (el) {
                            let t = true;
                            if (filter.types.length > 0) t = t && filter.types.includes(el.type);
                            if (filter.materiaux.length > 0) t = t && filter.materiaux.includes(el.materiaux);
                            t = t && (filter.prix[0] <= el.Prix) && (filter.prix[1] >= el.Prix);
                            return t
                        });
                        showProducts(filteredProducts);
                    },
                    (value) => {
                        console.error(value);
                    }
                );
            })
        });

    }, (value) => {
        console.error(value)
    })
}

/**
 * Cette fonction permet d'afficher les produits (dans le carousel et dans la grille de produits)
 * @param {Array} prods -> tableau des objets javascript représentant les produits
 * @param {String} placer -> une chaine de caractères correspondant à l'id du div où seront placer les produits 
 */
function showProducts(prods, placer = 'placer') {

    //On récupère l'objet DOM correspondant à la grille de produits
    const place = document.getElementById(placer);
    //On la vide
    place.innerHTML = "";

    //Pour chaque produit dans le tableau de produits
    prods.forEach((el) => {
        //On ajoute dans la grille une carte représentant le produit
        place.appendChild(productCard(el));
    });
    //On affiche le carousel des promotions
    promotionCarousel(prods);
}