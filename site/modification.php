<?php
    session_start();
    include('client/pages/header.html');
    include('server/scripts/fonctions.php');
    blockerPage(true, "index.php");
?>

<?php 
sideBar();

$products = callDatabase("select idP,NomP from Produits order by NomP ASC");

?>

<h1 class="center">Modifier un produit</h1>

<!-- select avec le nom des produits et en value leur id
ajax qui change la page  -->

<div class="container" id="placer">
    <div class="row">
        <br>
        <div class="input-field col s6 offset-s3">
            <select id="products" class="selectable" onchange="generateModificationForm(this.value);">
                <option value="" disabled selected>Produit à modifier</option>
                <?php
                if($products){
                    foreach($products as $value){
                        echo '<option value="'.$value["idP"].'">'.$value["NomP"].'</option>';
                    }
                }
                ?>
            </select>
            <label>Matériaux</label>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.selectable')
    M.FormSelect.init(elems);
    });
</script>

<?php
include('client/pages/footer.html');
?>