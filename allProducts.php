<?php
require_once 'app_config.php';

$product_table = new Database;
$product_array_recent = $product_table->readAll("Product");

?>

<!DOCTYPE html>
<html>
    <?php require_once 'head.html' ?>
    <body>
        <?php require_once 'navBar.html' ?>

        

        <script src="scripts/script.js"></script>
        <script>
            $('.button-all-products').remove();
            $('.search-bar').classList.add('alone');
        </script>
    </body>
</html>