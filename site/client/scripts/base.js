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
            const label = document.getElementById("label");
            label.innerText = "Error" + JSON.stringify(json);
            console.error(json);
        }
    );
}


function openProfil(){
    const slide = document.getElementById("slide-out");
    if(slide){
        const instance = M.Sidenav.getInstance(slide);
        instance.open();
    }
}



function infoUtilisateur(){
    ajax(
        {
            type : "infoUtilisateur",
            login : "uti@uti.fr"
        },
        (json)=>{

            Swal.fire({
                title: `Bienvenu ${json.content.login}`,
                text: "Vous allez être redirigé vers la page de connexion.",
                icon: "info",
                button: "OK",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
              });
        },
        (json)=>{
            console.error(json)
        }
    
    );
}
