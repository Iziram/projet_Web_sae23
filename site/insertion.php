<?php
    session_start();
    include('client/pages/header.html');
    include('server/scripts/fonctions.php');
    blockerPage(true, "index.php");
?>

<?php sideBar()?>

<?php

$nomPdt = "";
$prixPdt = "";
$promoPdt = "off";

if(!empty($_POST)){
    $nomPdt = isset($_POST["nom"]) ? $_POST["nom"] : "";
    $prixPdt = isset($_POST["prix"]) ? $_POST["prix"] : "";
    $promoPdt = isset($_POST["promo"]) ? $_POST["promo"] : "off";
    if(isset($_POST["captcha"]) && $_POST["captcha"] == $_SESSION["captcha"] ){

        $sql = "";
        if($promoPdt == "on" && $prixPdt != "" && $nomPdt != ""){
            $call = addProduct($nomPdt, $prixPdt, $promoPdt);
        }else{
            //Do something
        }
        

    }else{
        ?>
            <script>
                Swal.fire({
                    title: "Malheur une erreur !",
                    text: "Le captcha n'a pas été entré ou est incorrect",
                    icon: "error",
                    button: "J'ai compris",
                    timer: 5000,
                    timerProgressBar : true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            </script>
            <?php
    }
}


?>


<h1 class="center">Ajouter un produit</h1>

<form class="container" action="" method="post">
    <div class="row">
        <div class= "input-field col s5">
            <label for="nomPdt">Nom du produit : </label>
            <input id="nomPdt" name="nom" type="text" placeholder="Collier avec Emeraude" value="<?php echo $nomPdt;?>"/>
        </div>
        <div class= "input-field col s5">
            <label for="prixPdt">Prix du produit : </label>
            <input id="prixPdt" name ="prix" type="number" step="0.01" placeholder="Collier avec Emeraude" value="<?php echo $prixPdt;?>"/>
        </div>
        <div class= "input-field col s2">
        <p>
            <label>
                <?php
                if($promoPdt == "on"){
                    ?>
                    <input type="checkbox" class="filled-in" name="promo" checked/>
                    <?php
                }else{
                    ?>
                    <input type="checkbox" class="filled-in" name="promo"/>
                    <?php
                }

                ?>
                <span>En Promotion</span>
            </label>
        </p>
        </div>
    </div>
    <div class="center">
        <img src="server/scripts/captcha.php" style="width:12.5%;">
    </div>
    <div class="container row">
        <label for="captcha">Entrez le captcha: </label>
        <input id="captcha" name ="captcha" type="text" />
    </div>
    <div class="container row">
        <button class="btn col s12 center-align purple">Ajouter le produit</button>
    </div>

</fieldset>
<?php

    include('client/pages/footer.html');
    ?>