<!DOCTYPE html>
<html lang="en">
<?php
    $current_page = "Page Not Found";
    require_once __DIR__ . '/../static/head.html'; 
?>

<body class="loading page-404">
    <?php require_once __DIR__ . '/../static/header.html'; ?>
    <main>
        <h1 class="page-404-heading">Page Not Found</h1>
        <h4 class="page-404-message">You seem to be lost. Let's get you back <a href="/">home</a>.</h4>
    </main>
    <?php require_once __DIR__ . "/../static/footer.html"; ?>

    <script src="/scripts/script.js"></script>
</body>

</html>
