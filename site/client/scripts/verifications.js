function verifierLogin(login){
    const message = {
        maj : "il vous manque une majuscule",
        spe : "il vous manque un caractère spécial (. @ & * - _ $ )"
    }
    let progression = 0;
    if(/[A-Z]{1,}/.test(login)){
        progression += 50;
        message.maj = "";
    } 
    if(/[.@&*\-_$]{1,}/.test(login)){
        progression += 50;
        message.spe = "";
    }
    const bar = document.getElementById('progressBar_login_bar');
        bar.style.width = `${progression}%`;
    const progr_div = Array.from(document.getElementsByName("progressBar"));
    const text = document.getElementById("progressBar_login_text");
    if(progression < 100){
        progr_div.forEach(el => {
            el.classList.remove('hid');
            console.log(el.tagName)
            if(el.tagName == "P")
                el.classList.add('red-text');
            else
                el.classList.add('red');
        });
        let txt = message.maj + " " + message.spe;
        console.log(text)
        text.textContent = txt.trim()[0].toUpperCase() + txt.trim().substring(1);
    }else{
        progr_div.forEach(el => {
            el.classList.add('hid');
        });
    }

}
function testConnectForm(){
    const login = document.getElementById("login").value;
    const pass = document.getElementById("pass").value;
    const testLogin =  /[A-Z]{1,}/.test(login) && /[.@&*-_$]{1,}/.test(login);
    const testPass =  /^[A-z0-9._\-&@]{8,}$/.test(pass);
    
    if(!testLogin && !testPass){
        Swal.fire({
            title: "Oh non des erreurs",
            html: "<p>Attention votre nom d'utilisateur n'est pas valide.</p><p>Attention votre mot de passe n'est pas valide. Il doit avoir au minimum 8 caractères ( lettres, chiffres, caractère spéciaux : @.-_& ).</p>",
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
            text: "Attention votre nom d'utilisateur n'est pas valide.",
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