<?php
function callDatabase($sql, $select = true, $unique = false){
    $db = new PDO('sqlite:'.$_SERVER['DOCUMENT_ROOT'].'/server/bdd/bdd.db');
    $res = false;
    if($select){
        $res = $db->query($sql);
    }else{
        $res = $db->exec($sql);
    }

    if($res){
        if($select){
            if($unique){
                return $res->fetch(PDO::FETCH_ASSOC);
            }else{
                return $res->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        else{
            return true;
        }
    }else{
        return false;
    }
}

function quote($param){
    $db = new PDO('sqlite:'.$_SERVER['DOCUMENT_ROOT'].'/server/bdd/bdd.db');
    return $db->quote($param);
}
?>