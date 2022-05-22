<?php
include("server/scripts/bdd.php");
function connexionToApp($login, $pass){
    $qlogin = quote($login);
    $qpass = quote($pass);
    $sql = "select statut from Comptes where login = ".$qlogin . " and pass = ".$qpass;
    $res = callDatabase(
        $sql,
        true
    );

    if($res){
        $_SESSION["login"] = $login;
        $_SESSION["statut"] = $res["statut"];
        writeLog("Connexion réussie pour l'utilisateur : $qlogin [statut :".$res["statut"]."]");
        return true;
    }
    writeLog("Connexion refusée pour l'utilisateur : $qlogin");

    return false;
}
function addProduct($nom, $prix, $promo){
    $qnom = quote($nom);
    $qpromo = $promo == "on" ? "1" : "0";
    $sql = "insert into Produits (NomP, Prix, Promo) values ($qnom, $prix, $qpromo)";
    $res = callDatabase(
        $sql,
        true,
        false
    );

    if($res){
        ?>
        <script>
            Swal.fire({
                title: "Le produit a bien été ajouté",
                icon: "success",
                toast: true,
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar : true,
                position : "top-end",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        </script>
        
        <?php

    }else{
        ?>
        <script>
            Swal.fire({
                title: "Le produit n'a pas pu être ajouté",
                icon: "error",
                toast: true,
                timer: 5000,
                showConfirmButton: false,
                timerProgressBar : true,
                position : "top-end",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        </script>
        
        <?php
    }
    

    return false;
}

function formatInput($data)
{
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function blockerPage($needAdmin = false){
    if(empty($_SESSION) || !isset($_SESSION["login"])){
        ?>

    <script>
        Swal.fire({
            title: "Vous êtes déconnecté",
            text: "Vous allez être redirigé vers la page de connexion.",
            icon: "error",
            button: "OK",
            timer: 5000,
            timerProgressBar : true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          }).then(
              ()=>{
                  window.location = "connexion.php";
              }
          );
    </script>

    <?php
    }
    else if ($needAdmin && $_SESSION["statut"] != "admin"){
        ?>

    <script>
        Swal.fire({
            title: "Vous êtes n'êtes pas autorisé à être sur cette page",
            text: "Vous allez être redirigé vers la page index.",
            icon: "error",
            button: "OK",
            timer: 5000,
            timerProgressBar : true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          }).then(
              ()=>{
                  window.location = "index.php";
              }
          );
    </script>

    <?php
    }
}

?>