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

?>