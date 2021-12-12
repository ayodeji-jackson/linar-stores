<?php
require_once __DIR__ . "/../controllers/app_config.php";

$product_table = new Database;
$page = "Networking";

if (isset($_GET['q'])) {
    $search_query = htmlentities(strip_tags(stripslashes($_GET['q'])));
    $product_array = $product_table->search("linarStores.Product", "Name", $search_query);
    $current_page = "Search Results for '$search_query' in $page";
} else {
    $product_array = $product_table->readAll("linarStores.Product", "WHERE Product_Category = $page");
    $current_page = $page;
}

?>

<!DOCTYPE html>
<html lang="en">
<?php require_once __DIR__ . "/../static/head.html"; ?>

<body class="loading">
    <?php require_once __DIR__ . "/../static/header.html"; ?>
    <main class="no-carousel-container">
        <?php
        if (!empty($product_array)) {
            echo <<<_END
                <h1 class="section-heading">$current_page</h1>
            _END;
        } else {
            echo <<<_END
                <h1 class="section-heading center grey">🙁 No search results for '$search_query' in $page</h1>
            _END;
        }

        ?>
        <section class="product-section no-carousel">
            <?php
            shuffle($product_array);
            foreach ($product_array as $product) {
                $amount_saved = $product['product_actualprice'] - $product['product_discountprice'];
                echo "<div class='product' data-product-id='" . $product['product_id'] . "'>
                        <div class='product-savings'><i class='fa fa-percent'></i> Save <span class='price'>$amount_saved</span></div>
                        <img class='product-image' alt='" . $product['product_name'] . "' 
                        src='/images/" . $product['product_Image_url'] . "' />
                        <h3 class='product-category'>" . $product['product_category'] . "</h3>
                        <p class='product-name'>" . $product['product_name'] . "</p>
                        <div class='rating' data-rating='" . $product['product_rating'] . "'>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <span class='rating-number'>" . $product['product_rating'] . "</span>
                            <span class='rating-users'></span>
                        </div>
                        <div class='price-container'>
                            <span class='price product-discount-price'>" . $product['product_discountprice'] . "</span>
                            <span class='price product-actual-price'>" . $product['product_actualprice'] . "</span>
                        </div>
                        <div class='progressbar-container'>
                            <div class='progressbar' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='" . $product['product_qty'] . "'></div>";
                $available_in_stock = $product['product_qty'] > 1 ? "<span class='num-qty-available'>" . $product['product_qty'] . "</span> available in stock" : "Last product in stock";
                echo "
                            <span class='qty-available'>$available_in_stock</span>
                        </div>
                        <button class='add-to-cart-button btn btn-primary' onclick='addToCart(this)'><span class='button-text'>Add to cart <i class='fa fa-shopping-cart'></i></span></button>
                    </div>";
            }
            $product_table = NULL;

            ?>
        </section>
    </main>
    <?php require_once __DIR__ . "/../static/footer.html"; ?>

    <script src="/scripts/script.js"></script>
</body>

</html>
