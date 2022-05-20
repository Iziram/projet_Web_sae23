<?php
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
include $_SERVER['DOCUMENT_ROOT'].'/server/scripts/bdd.php';
if($contentType === "application/json"){
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    header("Content-Type: application/json; charset=UTF-8");
    if(isset($decoded["type"])){
        switch($decoded["type"]){
            case "getProducts":
                $ans = callDatabase("select * from Produits order by NomP ASC");
                if($ans)
                    answerCreator($ans, false);
                else
                    answerCreator("Erreur SQL");
                break;

            case "infoUtilisateur":
                $ans = callDatabase("select login,statut from Comptes where login=".quote($decoded["login"]),true);
                if($ans)
                    answerCreator($ans, false);
                else
                    answerCreator("Erreur SQL");
                break;
            default :
                answerCreator("Le type donné n'est pas reconnu.");
                break;
        }
        return;

    }else{
        answerCreator("Requete invalide, le paramètre Type est manquant.");
    return;

    }
    
}else{
        answerCreator("Le contenu de la requête est invalide." );
    return;

}

function answerCreator($content, $error = true){
    echo json_encode(array(
        "type" => $error ? "Error" : "Success",
        "content" => $content
    ));
}
?>