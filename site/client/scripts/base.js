function getAllProducts(selector = "") {
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
                if (selector.split(" ").some(
                        (select) => {
                            console.log(select, element.NomP.toLowerCase().includes(select.toLowerCase()));
                            return element.NomP.toLowerCase().includes(select.toLowerCase());
                        }
                    )) {
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

function testConnectForm(){
    const login = document.getElementById("login").value;
    const pass = document.getElementById("pass").value;
    const testLogin =  /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,8}$/.test(login);
    const testPass =  /^[A-z0-9._\-&@]{8,}$/.test(pass);
    
    if(!testLogin && !testPass){
        swal({
            title: "Oh non des erreurs",
            text: "Attention votre email n'est pas valide.\n Attention votre mot de passe n'est pas valide. Il doit avoir au minimum 8 caractères ( lettres, chiffres, caractère spéciaux : @.-_& ).",
            icon: "error",
            button: "J'ai compris",
          });
    }
    else if(!testLogin){
        swal({
            title: "Oh non une erreur",
            text: "Attention votre email n'est pas valide.",
            icon: "error",
            button: "J'ai compris",
          });
    }
    else if(!testPass){
        swal({
            title: "Oh non une erreur",
            text: "Attention votre mot de passe n'est pas valide. Il doit avoir au minimum 8 caractères ( lettres, chiffres, caractère spéciaux : @.-_& ).",
            icon: "error",
            button: "J'ai compris",
          });
    }
    return testLogin && testPass;
}


function openProfil(){
    const instance = M.Sidenav.getInstance(document.getElementById("slide-out"));
    if(instance){
        instance.open();
    }
}