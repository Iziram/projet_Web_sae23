<?php
session_start();

include('client/pages/header.html');

if(!empty($_SESSION)){
    $_SESSION = [];
    session_destroy();
    ?>

    <script>
        swal({
            title: "Vous avez été déconnecté",
            text: "Cliquer sur OK pour retourner à la page de connexion.",
            icon: "success",
            button: "OK",
          }).then(
              ()=>{
                  window.location = "connexion.php";
              }
          );
    </script>

    <?php
}else{
    ?>

    <script>
        swal({
            title: "Vous êtes déjà déconnecté",
            text: "Cliquer sur OK pour retourner à la page de connexion.",
            icon: "info",
            button: "OK",
          }).then(
              ()=>{
                  window.location = "connexion.php";
              }
          );
    </script>

    <?php
}


?>