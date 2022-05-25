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

 


 <div class="container">
 <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
  </ul>

 </div>
            
 <script>
   document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
 </script>

 <?php

    include('client/pages/footer.html');
    ?>