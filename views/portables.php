<?php
require_once __DIR__ . "/../controllers/app_config.php";

$product_table = new Database;
$page = "Portables";

if (isset($_GET['q'])) {
    $search_query = htmlentities(strip_tags(stripslashes($_GET['q'])));
    $product_array = $product_table->search("Product", "Name", $search_query);
    $current_page = "Search Results for '$search_query' in $page";
} else {
    $product_array = $product_table->readAll("Product", "WHERE `Product_Category` = 'Portables'");
    $current_page = $page;
}

?>

<!DOCTYPE html>
<html lang="en">
<?php require_once __DIR__ . "/../static/head.html"; ?>

<body>
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
                echo "<div class='product' data-product-id='" . $product['Product_Id'] . "'>
                        <img class='product-image' alt='" . $product['Product_Name'] . "' 
                        src='/images/" . $product['Product_Image_URL'] . "' />
                        <h3 class='product-category'>" . $product['Product_Category'] . "</h3>
                        <p class='product-name'>" . $product['Product_Name'] . "</p>
                        <div class='rating' data-rating='" . $product['Product_Rating'] . "'>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <i class='fa fa-star grey-star'></i>
                            <span class='rating-number'>" . $product['Product_Rating'] . "</span>
                            <span class='rating-users'></span>
                        </div>
                        <div class='price-container'>
                            <span class='price product-discount-price'>" . $product['Product_DiscountPrice'] . "</span>
                            <span class='price product-actual-price'>" . $product['Product_ActualPrice'] . "</span>
                        </div>
                        <div class='progressbar-container'>
                            <div class='progressbar' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='" . $product['Product_Qty'] . "'></div>";
                $available_in_stock = $product['Product_Qty'] > 1 ? "<span class='num-qty-available'>" . $product['Product_Qty'] . "</span> available in stock" : "Last product in stock";
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