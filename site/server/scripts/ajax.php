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

            case "getUniqueProduct":
                $ans = callDatabase("select * from Produits where idP= ".$decoded["id"],true,true);
                if($ans)
                    answerCreator($ans, false);
                else
                    answerCreator("Erreur SQL");
                break;
            
            case "updateProduct":
                $content = $decoded["product"];
                
                $sql = "update Produits set NomP = ".quote($content["nom"]).
                    ", Prix = ".$content["prix"].", type = ".quote($content["type"]).
                    ", image = ".quote($content["img"]).
                    ", materiaux = ".quote($content["mat"]).", Promo = ".
                    $content["promo"]." where idP = ".$content["id"];

                $ans = callDatabase(
                    $sql,
                    false
                );
                if($ans)
                    answerCreator($content, false);
                else
                    answerCreator("Erreur SQL -> '".$sql.";'");
                break;
            
            case "categoProduits":
                $types = callDatabase("select distinct type from Produits");
                $materiaux = callDatabase("select distinct materiaux from Produits");
                $prices = callDatabase("select max(prix)as maxi, min(prix) as mini from Produits",true, true);

                if($types && $materiaux && $prices){
                    $ans = array(
                        "types" => $types,
                        "materiaux" => $materiaux,
                        "prix" => $prices
                    );
                    answerCreator($ans, false);
                }
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