<?php
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

function formatInput($data)
{
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function blockerPage(){
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
}

?>