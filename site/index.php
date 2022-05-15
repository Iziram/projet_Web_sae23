 
<?php

include('client/pages/header.html');
include('server/scripts/bdd.php');
echo '<h1 class="center-align">Titre</h1>';
echo '<p id="label">Label : </p>';
?>

<script src="client/scripts/ajax.js"></script>
<input type ="text" id = "bob"/>
<button onclick="getAllProducts(document.getElementById('bob').value)">ajax</button>
<div id="placer">

</div>
<?php

include('client/pages/footer.html');
?>