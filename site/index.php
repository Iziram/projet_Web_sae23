 <?php
    session_start();
    include('client/pages/header.html');
    include('server/scripts/fonctions.php');
    blockerPage();
    echo '<h1 class="center-align">Titre</h1>';
    echo '<p id="label">Label : </p>';
    ?>

 <script src="client/scripts/ajax.js"></script>

 <ul id="slide-out" class="sidenav">
    <li><div class="user-view">
      <div class="background">
        <img src="images/office.jpg">
      </div>
      <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
      <a href="#name"><span class="dark-text name">John Doe</span></a>
      <a href="#email"><span class="dark-text email"><?php echo $_SESSION["login"];?></span></a>
    </div></li>
    <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
    <li><a href="#!">Second Link</a></li>
    <li><div class="divider"></div></li>
    <li><a class="subheader">Subheader</a></li>
    <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>

    <a class="btn purple" href="deconnexion.php">deconnexion</a>
  </ul>
   <script>
      document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
   </script>

 <input type="text" id="bob" />
 <button onclick="getAllProducts(document.getElementById('bob').value)">ajax</button>
 <button class="btn" onclick="infoUtilisateur()">info</button>
 <div id="placer">

 </div>
 <?php

    include('client/pages/footer.html');
    ?>