 <?php
    session_start();
    include('client/pages/header.html');
    include('server/scripts/fonctions.php');
    blockerPage();
    echo '<h1 class="center-align">Titre</h1>';
    ?>

 <script src="client/scripts/ajax.js"></script>

  <?php sideBar()?>

  <div class="container center">
    <input type="text" id="selector" onkeyup="getAllProducts(document.getElementById('selector').value, document.getElementById('strict').checked)" />
    <p>
      <label>
        <input id="strict" type="checkbox" class="filled-in" onclick="getAllProducts(document.getElementById('selector').value, document.getElementById('strict').checked)"/>
        <span>Contient strictement</span>
      </label>
    </p>
    <button class="btn" onclick="getAllProducts(document.getElementById('selector').value, document.getElementById('strict').checked)">ajax</button>
  </div>
 <div id="placer">

 </div>
 <?php

    include('client/pages/footer.html');
    ?>