<?php
session_start();
include('client/pages/header.html');
include('server/scripts/fonctions.php');

?>

<?php



?>
<script>
    const html = `
<div class="center">
    <div clas="row">
        <img class="col s6 img" alt="photo" src="server/images/boucle_argent.jpg"/>
    </div>
    <div class="row">
        <h5 class="flow-text" >Nom du produit</h5>
    </div>
    <div class="row">
        <p class="flow-text col s3">
            Prix
        </p>
        <p class="flow-text col s3">
            Type
        </p>
        <p class="flow-text col s3">
            Materiaux
        </p>
    </div>
    <div class="row">
        <p>En Promo</p>
    </div>
</div>
`;

Swal.fire({
    title: "Le produit a bien été modifié",
    html: html,
    icon: "success",
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
    });
</script>  

<?php
    include('client/pages/footer.html');
?>