<?php
session_start();
include('client/pages/header.html');
include('server/scripts/fonctions.php');

?>

<?php



?>
    <div class="container">
        <div class="input-field col s12">
            <select id="selectType">
                <option value="" disabled selected>Type de produit</option>
                <?php
                if($types){
                    foreach($types as $value){
                        
                        echo '<option value="'.$value["type"].'">'.$value["type"].'</option>';
                    }
                }
                ?>
            </select>
            <label>Type</label>
        </div>
    </div>
    <div class="container">
        <div class="input-field col s12">
            <select id="selectMat">
                <option value="" disabled selected>Type de Matériaux</option>
                <?php
                if($materiaux){
                    foreach($materiaux as $value){
                        echo '<option value="'.$value["materiaux"].'">'.$value["materiaux"].'</option>';
                    }
                }
                ?>
            </select>
            <label>Matériaux</label>
        </div>
    </div>

    

<?php
    include('client/pages/footer.html');
?>