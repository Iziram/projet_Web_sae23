<?php
session_start();
    include('client/pages/header.html');
    include("server/scripts/fonctions.php");
    include("server/scripts/log.php");
    include("server/scripts/bdd.php");


    if(!empty($_POST) && isset($_POST["login"]) && isset($_POST["pass"])){
        $login = formatInput($_POST["login"]);
        $pass = formatInput($_POST["pass"]);

        $res = connexionToApp($login,$pass);
        if($res){
            ?>
            <script>
                swal({
                    title: "Vous êtes désormais connecté.",
                    text: "Cliquer sur OK pour être redirigé sur le site",
                    icon: "success",
                    button: "OK",
                }).then((value)=>{
                    window.location = "index.php";
                });
            </script>
            <?php
        }else{
            ?>
            <script>
                swal({
                    title: "Connexion Refusée",
                    text: "Le couple identifiant / mot de passe n'existe pas ou est incorrecte.",
                    icon: "error",
                    button: "J'ai compris",
                });
            </script>
            <?php
        }
    }

?>

<form class="container" action="" method="post" onsubmit="return testConnectForm()">

<label for="login">Login: </label>
<input type="email" name="login" id="login" placeholder="Nom d'utilisateur" required/>
<p class="err" id="errLogin"></p>

<label for="pass">Mot de passe: </label>
<input type="password" name="pass" id="pass" required/>
<p class="err" id="errPass"></p>


<input class="btn" type="submit" value="Se connecter"/>
</form>

<?php
    include('client/pages/footer.html');
?>