function getAllProducts(selector = "", strict = false) {
    ajax({
            type: "getProducts"
        },
        function(json) {
            const placer = document.getElementById("placer");
            placer.innerHTML = "";
            const produits = json.content;
            const ul = document.createElement("ul");
            ul.classList.add("collection");
            produits.forEach(element => {
                let testSelector = false;
                if(strict){
                    testSelector = selector.split(" ").every(
                        (select) => {
                            return element.NomP.toLowerCase().includes(select.toLowerCase());
                        }
                    );
                }else{
                    testSelector = selector.split(" ").some(
                        (select) => {
                            return element.NomP.toLowerCase().includes(select.toLowerCase());
                        }
                    );
                }

                if (testSelector) {
                    const pdt = document.createElement('li');
                    pdt.classList.add("collection-item");
                    const title = document.createElement("span");
                    title.classList.add("title");
                    title.innerHTML = element.NomP;
                    pdt.appendChild(title);

                    const info = document.createElement('p');
                    info.textContent = `Prix : ${element.Prix.toFixed(2)}€ ID : ${element.idP}`;
                    pdt.appendChild(info);
                    ul.appendChild(pdt);
                }

            });
            placer.appendChild(ul);
        },
        (json) => {
            console.error(json);
        }
    );
}

function openProfil(){
    const slide = document.getElementById("profil");
    if(slide){
        const instance = M.Sidenav.getInstance(slide);
        instance.open();
    }
}
function test(){
    const slide = document.getElementById("test");
    if(slide){
        const instance = M.Sidenav.getInstance(slide);
        instance.open();
    }
}

function productCategory(){
    const promise = new Promise((resolve, reject)=>{
        ajax(
            {
                type : "categoProduits",
            },
            function(json) {
                resolve(json.content);
            },
            function(json) {
                reject(json.content);
            }
        );
    })
    
    return promise;
}

function fullProducts(){
    const promise = new Promise((resolve, reject)=>{
        ajax(
            {
                type : "getProducts",
            },
            function(json) {
                resolve(json.content);
            },
            function(json) {
                reject(json.content);
            }
        );
    })
    
    return promise;
}

function dynamicFilter(){
    const cat = productCategory();
    cat.then((value)=>{
        const types = value.types.map((el) => el["type"]);
        const mat = value.materiaux.map((el) => el["materiaux"]);
        
        //Gestion des checkbox des materiaux
        const ulMat = document.getElementById('mat');
        ulMat.innerHTML = "";
        mat.forEach(function (el){
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
        types.forEach(function (el){
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
                maxi.textContent = value+ "€";
            } else {
                mini.textContent = value + "€";
            }

            const filter = getFilter(slider);
            const products = fullProducts();
            let filteredProducts = [];
            products.then(
                function (value) {
                    filteredProducts = value.filter(function (el){
                        let t = true;
                        if(filter.types.length > 0) t = t && filter.types.includes(el.type);
                        if(filter.materiaux.length > 0) t = t && filter.materiaux.includes(el.materiaux);
                        t = t && ( filter.prix[0] <= el.Prix) && ( filter.prix[1] >= el.Prix);
                        return t
                    });
                    showProducts(filteredProducts);
                },
                (value)=>{
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
                            filteredProducts = value.filter(function (el){
                                let t = true;
                                if(filter.types.length > 0) t = t && filter.types.includes(el.type);
                                if(filter.materiaux.length > 0) t = t && filter.materiaux.includes(el.materiaux);
                                t = t && ( filter.prix[0] <= el.Prix) && ( filter.prix[1] >= el.Prix);
                                return t
                            });
                            showProducts(filteredProducts);
                        },
                        (value)=>{
                            console.error(value);
                        }
                    );
                })
            });
        
    },(value)=>{
        console.error(value)
    })
}

function showProducts(prods, placer = 'placer'){
    const place = document.getElementById(placer);
    place.innerHTML = "";
    prods.forEach((el)=>{
        const title = document.createElement('span');
            title.classList.add('title');
        const text = document.createTextNode(`${el.NomP}=>\n ${el.type} | ${el.materiaux} | ${el.Prix.toFixed(2)}€`);
        const div = document.createElement('div');
        div.classList.add('col','s2');
        div.appendChild(document.createElement('hr'));
        div.appendChild(title);
        div.appendChild(text);
        div.appendChild(document.createElement('hr'));
        place.appendChild(div);
    })
}

function getFilter(slider){
    const ulTypeChecks = Array.from(document.getElementById('type').childNodes).filter((el) =>{
        return el.firstChild.firstChild.checked;
    });
    const ulMatChecks = Array.from(document.getElementById('mat').childNodes).filter((el) =>{
        return el.firstChild.firstChild.checked;
    });

    return {
        "types" : ulTypeChecks.map((el) => {
        return el.firstChild.lastChild.textContent;
        }),
        "materiaux" : ulMatChecks.map((el) => {
            return el.firstChild.lastChild.textContent;
        }),
        "prix" : slider.noUiSlider.get()
    };
}