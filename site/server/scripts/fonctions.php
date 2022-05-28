<?php
include("server/scripts/bdd.php");
function connexionToApp($login, $pass){
    $qlogin = quote($login);
    $qpass = quote($pass);
    $sql = "select statut from Comptes where login = ".$qlogin . " and pass = ".$qpass;
    $res = callDatabase(
        $sql,
        true
    );

    if($res){
        $_SESSION["login"] = $login;
        $_SESSION["statut"] = $res["statut"];
        writeLog("Connexion réussie pour l'utilisateur : $qlogin [statut :".$res["statut"]."]");
        return true;
    }
    writeLog("Connexion refusée pour l'utilisateur : $qlogin");

    return false;
}
function addProduct($nom, $prix, $promo, $type, $mat, $path){
    $qnom = quote($nom);
    $qtype = quote($type);
    $qmat = quote($mat);
    $qpath = quote($path);
    $qpromo = $promo == "on" ? "1" : "0";
    $sql = "insert into Produits (NomP, Prix, Promo, type, materiaux, image) values ($qnom, $prix, $qpromo, $qtype, $qmat, $qpath)";
    $res = callDatabase(
        $sql,
        false,
        true
    );

    if($res){
        ?>
        <script>
            Swal.fire({
                title: "Le produit a bien été ajouté",
                icon: "success",
                toast: true,
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar : true,
                position : "top-end",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        </script>
        
        <?php
        return true;

    }else{
        ?>
        <script>
            Swal.fire({
                title: "Le produit n'a pas pu être ajouté",
                icon: "error",
                toast: true,
                timer: 5000,
                showConfirmButton: false,
                timerProgressBar : true,
                position : "top-end",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        </script>
        
        <?php
    }
    

    return false;
}

function formatInput($data)
{
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function blockerPage($needAdmin = false){
    if(empty($_SESSION) || !isset($_SESSION["login"])){
        ?>

    <script>
        Swal.fire({
            title: "Vous êtes déconnecté",
            text: "Vous allez être redirigé vers la page de connexion.",
            icon: "error",
            button: "OK",
            timer: 5000,
            timerProgressBar : true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          }).then(
              ()=>{
                  window.location = "connexion.php";
              }
          );
    </script>

    <?php
    }
    else if ($needAdmin && $_SESSION["statut"] != "admin"){
        ?>

    <script>
        Swal.fire({
            title: "Vous êtes n'êtes pas autorisé à être sur cette page",
            text: "Vous allez être redirigé vers la page index.",
            icon: "error",
            button: "OK",
            timer: 5000,
            timerProgressBar : true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          }).then(
              ()=>{
                  window.location = "index.php";
              }
          );
    </script>

    <?php
    }
}

function sideBar(){
    $statut =  $_SESSION["statut"] == "admin" ? "Administrateur" : "Utilisateur";
    ?>
    <ul id="profil" class="sidenav">
    <li><div class="user-view center">
      <!-- <a href="#user"><img class="circle" src="images/yuna.jpg"></a> -->
      <a href="#email"><span class="dark-text email"><?php echo $_SESSION["login"];?></span></a>
      <a href="#name"><span class="dark-text name"><?php echo $statut;?></span></a>
    </div></li>
    <li><a href="index.php"><i class="material-icons">home</i>Accueil</a></li>
    <li><a href="panier.php"><i class="material-icons">shopping_bag</i>Panier</a></li>
    <?php
        if($statut == "Administrateur"){
            ?>
            <li><a href="insertion.php"><i class="material-icons">add_box</i>Créer Nouveau Produit</a></li>
            <li><a href="modification.php"><i class="material-icons">edit</i>Modifier un Produit</a></li>
            <?php
        }
    ?>
    <li><div class="divider"></div></li>
    <br/>
    <div class="center">
        <a class="btn purple" href="deconnexion.php"><i class="material-icons">logout</i>deconnexion</a>
    </div>
  </ul>
   <script>
      document.addEventListener('DOMContentLoaded', function() {
    var elem = document.getElementById('profil');
    var instances = M.Sidenav.init(elem, {edge : "right"});
  });
   </script>
    <?php
}

function generateDynamicProductList(){
    ?>
   <ul id="test" class="sidenav">
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
      <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header">Type<i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul id="type">
                
              </ul>
            </div>
          </li>
          <li>
            <a class="collapsible-header">Matériaux<i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul id="mat">
                
              </ul>
            </div>
          </li>
          <li>
            <a class="collapsible-header">Prix<i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li class="container center">
                    <br>
                    <div id="test-slider" class="slider-round"></div>
                    <span id="min" class="hoverable">A</span><span>|</span><span id="max" class="hoverable">B</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>



    <div class="row container" id="placer">

    </div>
    <script>
        
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.getElementById('test');
    var instances = M.Sidenav.init(elems);
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  var collapsibleElem = document.querySelector('.collapsible');
  var collapsibleInstance = M.Collapsible.init(collapsibleElem);

    dynamicFilter();
    fullProducts().then((value)=>{
        showProducts(value);
    }, (value)=>console.error(value))
    </script>
    <?php
}

?>