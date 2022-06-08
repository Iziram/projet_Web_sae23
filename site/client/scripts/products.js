function productCategory() {
    const promise = new Promise((resolve, reject) => {
        ajax(
            {
                type: "categoProduits",
            },
            function (json) {
                resolve(json.content);
            },
            function (json) {
                reject(json.content);
            }
        );
    })

    return promise;
}

function fullProducts() {
    const promise = new Promise((resolve, reject) => {
        ajax(
            {
                type: "getProducts",
            },
            function (json) {
                resolve(json.content);
            },
            function (json) {
                reject(json.content);
            }
        );
    })

    return promise;
}

function getFilter(slider) {
    const ulTypeChecks = Array.from(document.getElementById('type').childNodes).filter((el) => {
        return el.firstChild.firstChild.checked;
    });
    const ulMatChecks = Array.from(document.getElementById('mat').childNodes).filter((el) => {
        return el.firstChild.firstChild.checked;
    });

    return {
        "types": ulTypeChecks.map((el) => {
            return el.firstChild.lastChild.textContent;
        }),
        "materiaux": ulMatChecks.map((el) => {
            return el.firstChild.lastChild.textContent;
        }),
        "prix": slider.noUiSlider.get()
    };
}

function getProduct(idP) {
    const promise = new Promise((resolve, reject) => {
        ajax(
            {
                type: "getUniqueProduct",
                id: idP
            },
            function (json) {
                resolve(json.content);
            },
            function (json) {
                reject(json.content);
            }
        );
    })

    return promise;
}

function generateModificationForm(idP) {
    const promise = getProduct(idP);

    promise.then(
        (item) => {

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
            promo.checked = item.Promo ? "checked" : "";

            const cat = productCategory();
            cat.then(function (value) {
                const types = value.types.map((el) => el["type"]).sort();
                const mats = value.materiaux.map((el) => el["materiaux"]).sort();

                types.forEach((el) => {
                    type.options.add(new Option(el, el, false, el == item.type));
                });
                mats.forEach((el) => {
                    mat.options.add(new Option(el, el, false, el == item.materiaux));
                });

                let elems = document.querySelectorAll('.selectable');
                M.FormSelect.init(elems);

            },
                (value) => console.error(value));



        },
        (value) => { console.error(value); }
    );
}

function updateProduct() {
    const obj = {
        id: 0,
        nom: "",
        type: "",
        mat: "",
        prix: 0.0,
        promo: 0,
        img: ""
    };

    const values = Array.from(document.getElementsByClassName('FormValue'));
    values.forEach(function (el) {
        switch (el.id) {
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
            type: "updateProduct",
            product: obj
        },
        (json) => {
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
        (json) => {
            console.error(json);
        }
    );
}

function modificationProductList(selector = "") {
    ajax({
        type: "getProducts"
    },
        function (json) {
            const placer = document.getElementById("products");
            placer.innerHTML = "";
            const produits = json.content.sort((a, b) => {
                let fa = a.NomP.toLowerCase(),
                    fb = b.NomP.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            //<option value="" disabled selected>Choose your option</option>
            const disabled = new Option("Produit à Modifier",'',true, true);
            disabled.disabled = "disabled";
            placer.add(disabled);
            produits.forEach(element => {
                if (element.NomP.toLowerCase().startsWith(selector.toLowerCase())) {
                    placer.add(new Option(element.NomP, element.idP));
                }
            });

            let elems = document.querySelectorAll('.selectable');
            M.FormSelect.init(elems);
        },
        (json) => {
            const label = document.getElementById("label");
            label.innerText = "Error" + JSON.stringify(json);
            console.error(json);
        });

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