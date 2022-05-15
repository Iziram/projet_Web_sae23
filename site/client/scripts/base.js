function getAllProducts(selector = ""){
    ajax({type : "getProducts"},
        function(json){
            const placer = document.getElementById("placer");
            placer.innerHTML = "";

            const produits = json.content;
                const ul = document.createElement("ul");
                ul.classList.add("collection");
                produits.forEach(element => {
                    if(element.NomP.toLowerCase().includes(selector.toLowerCase())){
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
        (json)=>{
            const label = document.getElementById("label");
                label.innerText = "Error"  + JSON.stringify(json);
                console.error(json);
        }
    );
}