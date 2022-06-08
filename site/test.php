<?php
    session_start();
    include('client/pages/header.html');
    include('server/scripts/fonctions.php');
?>

      <div class="row">
        <div class="col s3">
            <div class="card small">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator pdtImg" src="server/images/boucle_argent.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">This is a link</a></p>
                </div>
                <div class="card-reveal">
                    <div class="row">
                        <span class="card-title grey-text text-darken-4 col s12 center">Card Title<i class="material-icons right">close</i></span>
                    </div>
                    <hr>
                    <div class="row">
                        <h3 class="col s12 center">PRIX</h3>
                    </div>
                    <hr>
                    <div class="row">
                        <h3 class="col s6 center">Type</h3>
                        <h3 class="col s6 center">materiaux</h3>
                    </div>
                </div>
            </div>
        </div>
      </div>