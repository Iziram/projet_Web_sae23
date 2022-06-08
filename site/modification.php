<?php
    session_start();
    include('client/pages/header.html');
    include('server/scripts/fonctions.php');
    blockerPage(true, "index.php");
?>

<?php 
sideBar();
?>
<script src="client/scripts/products.js"></script>
<h1 class="center">Modifier un produit</h1>

<!-- select avec le nom des produits et en value leur id
ajax qui change la page  -->
<br>
<br>
<div class="container" id="placer">
    <div class="row">
        <input class="col s6 offset-s3 center" type="text" placeholder="Filtrer les noms de produits" id="selector" onkeyup="modificationProductList(this.value)"/>
    </div>
    <br>
    <div class="row">
        <br>
        <div class="input-field col s6 offset-s3">
            <select id="products" class="selectable" onchange="generateModificationForm(this.value);">
            </select>
            <label>Matériaux</label>
        </div>
    </div>
</div>

<script>
modificationProductList();
</script>

<?php
include('client/pages/footer.html');
?>