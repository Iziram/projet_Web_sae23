<?php
session_start();
    include('client/pages/header.html');
    include("server/scripts/fonctions.php");
    include("server/scripts/log.php");


    if(!empty($_POST) && isset($_POST["login"]) && isset($_POST["pass"])){
        $login = formatInput($_POST["login"]);
        $pass = formatInput($_POST["pass"]);
        $res = connexionToApp($login,$pass);
        if($res){
            ?>
            <script>
                Swal.fire({
                    title: "Vous êtes désormais connecté.",
                    text: "Vous allez être redirigé sur le site",
                    icon: "success",
                    button: "OK",
                    timer: 5000,
                    timerProgressBar : true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }).then((value)=>{
                    window.location = "index.php";
                });
            </script>
            <?php
        }else{
            ?>
            <script>
                Swal.fire({
                    title: "Connexion Refusée",
                    text: "Le couple identifiant / mot de passe n'existe pas ou est incorrecte.",
                    icon: "error",
                    button: "J'ai compris",
                    timer: 5000,
                    timerProgressBar : true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            </script>
            <?php
        }
    }else if(!empty($_SESSION) && isset($_SESSION["login"])){
        ?>
            <script>
                Swal.fire({
                    title: "Vous êtes déjà connecté.",
                    text: "Vous allez être redirigé sur le site",
                    icon: "success",
                    button: "OK",
                    timer: 5000,
                    timerProgressBar : true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }).then((value)=>{
                    window.location = "index.php";
                });
            </script>
            <?php
    }

?>
<script src="client/scripts/verifications.js"></script>
<form class="container" action="" method="post" onsubmit="return testConnectForm()">

<label for="login">Login: </label>
<input type="text" name="login" id="login" placeholder="Nom d'utilisateur" required onkeyup="verifierLogin(this.value)"/>
<div id="progressBar_login_div" class="progress hid" name="progressBar">
    <div id="progressBar_login_bar"class="determinate" style="width: 50%"></div>
</div>
<p id="progressBar_login_text" class="hid" name="progressBar"></p>

<label for="pass">Mot de passe: </label>
<input type="password" name="pass" id="pass" required/>

<input class="btn" type="submit" value="Se connecter"/>
</form>

<?php
    include('client/pages/footer.html');
?>