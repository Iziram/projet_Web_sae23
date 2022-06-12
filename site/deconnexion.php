<?php
session_start();

include('client/pages/header.html');

if (!empty($_SESSION)) {
    $_SESSION = [];
    session_destroy();
?>

    <script>
        Swal.fire({
            title: "Vous avez été déconnecté",
            text: "Vous allez être redirigé vers la page de connexion.",
            icon: "success",
            button: "OK",
            timer: 5000,
            timerProgressBar: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(
            () => {
                window.location = "connexion.php";
            }
        );
    </script>

<?php
} else {
?>

    <script>
        Swal.fire({
            title: "Vous êtes déjà déconnecté",
            text: "Vous allez être redirigé vers la page de connexion.",
            icon: "info",
            button: "OK",
            timer: 5000,
            timerProgressBar: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(
            () => {
                window.location = "connexion.php";
            }
        );
    </script>

<?php
}


?>