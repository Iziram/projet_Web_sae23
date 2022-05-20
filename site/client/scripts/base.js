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
        Swal.fire({
            title: "Oh non des erreurs",
            html: "<p>Attention votre email n'est pas valide.</p><p>Attention votre mot de passe n'est pas valide. Il doit avoir au minimum 8 caractères ( lettres, chiffres, caractère spéciaux : @.-_& ).</p>",
            icon: "error",
            button: "J'ai compris",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          });
    }
    else if(!testLogin){
        Swal.fire({
            title: "Oh non une erreur",
            text: "Attention votre email n'est pas valide.",
            icon: "error",
            button: "J'ai compris",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          });
    }
    else if(!testPass){
        Swal.fire({
            title: "Oh non une erreur",
            text: "Attention votre mot de passe n'est pas valide. Il doit avoir au minimum 8 caractères ( lettres, chiffres, caractère spéciaux : @.-_& ).",
            icon: "error",
            button: "J'ai compris",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          });
    }
    return testLogin && testPass;
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
