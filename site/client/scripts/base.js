function populateNavBarIcons(){
    const iconList = document.getElementById('navIcons');
    const page = window.location.pathname.substring(1);
    const link = (func, icon)=>{
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
    switch (page){
        case "index.php":
            iconList.appendChild(link(function(){test();}, 'search'));
            iconList.appendChild(link(function(){openProfil();}, 'account_circle'));
            break;
        case "insertion.php":
            iconList.appendChild(link(function(){openProfil();}, 'account_circle'));
            break
        case "modification.php":
            iconList.appendChild(link(function(){openProfil();}, 'account_circle'));
            break
        default :
            break
    }


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

function getProduct(idP){
    const promise = new Promise((resolve, reject)=>{
        ajax(
            {
                type : "getUniqueProduct",
                id : idP
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

function generateModificationForm(idP){
    const promise = getProduct(idP);

    promise.then(
        (item)=>{
            
            const html = `
            <div><div class="row">
            <span class="FormValue hid" id="idPdt"></span>
        <div class= "input-field col s5">
            <label for="nomPdt" class="active">Nom du produit : </label>
            <input class="FormValue" id="nomPdt" name="nom" type="text" placeholder="Collier avec Emeraude" value="bite"/>
        </div>
        <div class= "input-field col s5">
            <label for="prixPdt" class="active">Prix du produit : </label>
            <input class="FormValue"  id="prixPdt" name ="prix" type="number" step="0.01" placeholder="6940.69"/>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s5">
            <select id="selectType" name="selectType" class="selectable FormValue" >
            </select>
            <label class="active">Type</label>
        </div>
        <div class="input-field col s5">
            <select id="selectMat" name="selectMat" class="selectable FormValue" >
            </select>
            <label class="active">Matériaux</label>
        </div>
        <div class="row">
            <div class= "input-field col s5">
                <label class="active" for="filePath">Lien vers l'image : </label>
                <input class="FormValue"  id="filePath" name="filePath" type="text" placeholder="image.jpg"/>
            </div>
            <div class= "input-field col s5 center">
            <p>
                
                <label for="promoP">
                    <input class="FormValue"  type="checkbox" class="filled-in"id="promoP"/>
                    <span>En Promotion</span>
                </label>
            </p>
            </div>
    </div>
    <div class="container row">
        <button class="btn col s12 center-align purple" onclick="updateProduct();">Modifier le produit</button>
    </div>
    <div class="container row">
        <button class="btn col s6 offset-s3 center-align purple" onclick="location.reload();">Choisir un autre produit</button>
    </div>
    </div>
            `;
            const doc = HTMLParser(html);
            const placer = document.getElementById('placer');
                placer.innerHTML = "";
                placer.appendChild(doc);
            const nomP = document.getElementById('nomPdt');
                nomP.value = item.NomP;
            const prixP = document.getElementById('prixPdt');
                prixP.value = item.Prix.toFixed('2');
            const type = document.getElementById('selectType');
            const mat = document.getElementById('selectMat');
            const file = document.getElementById('filePath');
                file.value = item.image;
            const id = document.getElementById('idPdt');
                id.textContent = item.idP;
            const promo = document.getElementById('promoP');
                promo.checked = item.Promo  ? "checked" : "";

            const cat = productCategory();
            cat.then(function (value){
                const types = value.types.map((el) => el["type"]).sort();
                const mats = value.materiaux.map((el) => el["materiaux"]).sort();

                types.forEach((el)=>{
                    type.options.add(new Option(el, el, false, el == item.type));
                });
                mats.forEach((el)=>{
                    mat.options.add(new Option(el, el, false, el == item.materiaux));
                });

                let elems = document.querySelectorAll('.selectable');
                M.FormSelect.init(elems);

            }, 
            (value)=>console.error(value));
            
            

        },
        (value) => {console.error(value);}
    );
}

function updateProduct(){
    const obj = {
        id : 0,
        nom : "",
        type : "",
        mat : "",
        prix : 0.0,
        promo : 0,
        img: ""
    };

    const values = Array.from(document.getElementsByClassName('FormValue'));
        values.forEach(function(el){
            switch(el.id){
                case "nomPdt":
                    obj.nom = el.value;
                    break;
                case "prixPdt":
                    obj.prix = el.value;
                    break;
                case "selectType":
                    obj.type = el.value;
                    break;
                case "selectMat":
                    obj.mat = el.value;
                    break;
                case "filePath":
                    obj.img = el.value;
                    break;
                case "promoP":
                    obj.promo = el.checked ? 1 : 0;
                    break;
                case "idPdt":
                    obj.id = el.textContent;
                    break;
            }
        })
    console.warn(obj);
    ajax(
        {
            type : "updateProduct",
            product : obj
        },
        (json)=>{
            const prod = json.content;
            const promo = prod.promo ? "l'article est en promotion" : "l'article n'est pas en promotion";
            const html = `
            <div class="center">
                <div clas="row">
                    <img class="col s6 img" alt="photo" src="server/images/${prod.img}"/>
                </div>
                <div class="row">
                    <h5 class="flow-text">${prod.nom}</h5>
                </div>
                <div class="row">
                    <p class="flow-text col s4">
                        ${prod.prix}€
                    </p>
                    <p class="flow-text col s4">
                        ${prod.type}
                    </p>
                    <p class="flow-text col s4">
                        ${prod.mat}
                    </p>
                </div>
                <div class="row center">
                    <p class="flow-text col s6">${promo}</p>
                </div>
            </div>
            `;

            Swal.fire({
                title: "Le produit a bien été modifié",
                html: html,
                icon: "success",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
                });
        },
        (json)=>{
            console.error(json);
        }
    );
}

/**
 * Cette fonction convertie une chaine de caractère (représentant des éléments html) en élément DOM utilisable par JavaScript
 * @param {String} html la chaine de caractère représentant les élémments html
 * @param {String} mode = "text/html" Le mode par défaut est en text/html mais il existe aussi d'autres modes comme le text/XML qui peut être utilisé
 * @returns un élément DOM 
 */
 function HTMLParser(html, mode = "text/html"){
    if(mode === "text/html"){
        /** le mode text/html nous renverras un document entier (balise html + balise body + balise éléments)
        * On doit donc ruser un peu pour récuppérer l'élément que l'on souhaite :
        * On prend le premier enfant du document : ( document -> <html/> )
        * Puis le dernier enfant de l'html : ( <html/> -> <body/> )
        * Et enfin le premier enfant du body : ( <body/> -> <element/> )
        */
        return new DOMParser().parseFromString(html, mode).firstChild.lastChild.firstChild
    }else{
        //Dans les autres cas le premier enfant sera directement l'élément
        return new DOMParser().parseFromString(html, mode).firstChild
    }
}