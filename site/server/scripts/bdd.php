<?php
function callDatabase($sql, $unique = false, $select = true){
    $db = new PDO('sqlite:'.$_SERVER['DOCUMENT_ROOT'].'/server/bdd/bdd.db');
    $res = false;
    if($select){
        $res = $db->query($sql);
    }else{
        $res = $db->exec($sql);
    }

    if($res){
        if($unique){
            return $res->fetch(PDO::FETCH_ASSOC);
        }else{
            return $res->fetchAll(PDO::FETCH_ASSOC);
        }
    }else{
        return false;
    }
}

?>