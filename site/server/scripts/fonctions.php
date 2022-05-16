<?php
function connexionToApp($login, $pass){
    $qlogin = quote($login);
    $qpass = quote($pass);

    $sql = "select statut from Comptes where login = ".$qlogin . " and pass = ".$qpass;
    $res = callDatabase(
        $sql,
        true
    );

    var_dump($res);
    if($res){
        $_SESSION["login"] = $login;
        $_SESSION["statut"] = $res["statut"];
        return true;
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

?>