<?php

function writeLog($message){
    $log = fopen($_SERVER['DOCUMENT_ROOT'].'/server/logs/access.log','a+');
    $ip = $_SERVER['REMOTE_ADDR'];
    fputs(
        $log, 
        "[".date("d-m-Y H:i:s")."] {$ip}".
        " $message \n"
    );
    fclose($log);
}
