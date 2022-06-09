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