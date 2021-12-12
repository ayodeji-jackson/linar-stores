<?php
require_once __DIR__ . '/../controllers/app_config.php';

$category_table = new Database;
$category_array = $category_table->readAll("linarStores.Category");

$product_table = new Database;
$product_array_recent = $product_table->readAll("linarStores.Product", "ORDER BY `Product_Date` DESC LIMIT 5");

?>

<!DOCTYPE html>
<html lang="en">
<?php require_once __DIR__ . '/../static/head.html'; ?>
<body class="loading">
    <?php require_once __DIR__ . '/../static/header.html'; ?>
    <aside>
        <div class="hero">
            <h6 class="hero-promo">25% off promotional sale</h6>
            <h1 class="hero-main-text">The tech store just for you.</h1>
            <h5 class="hero-side-text">What do you want?</h5>
            <a href="all-products" class="hero-button btn btn-primary"><span class='button-text'>Browse Products</span></a>
        </div>
    </aside>
    <main>
        <section class="category-section carousel" data-flickity='{ "cellAlign": "left", "contain": true }'>
            <?php

            foreach ($category_array as $category) {
                echo "<div class='category cell-carousel'>
                        <img class='category-image' alt='" . $category['category_name'] . "' src='/images/" . $category['category_image_url'] . "' />
                        <h3>" . $category['category_name'] . "</h3>
                        <p>" . $category['category_description'] . "</p>
                        <a href='" . strtolower($category['category_name']) . "' class='btn category-button btn-primary'><span class='button-text'>Shop Now</span></a>
                    </div>";
            }
            $category_array = NULL;

            ?>
        </section>
        <h1 class="section-heading">Newly Added <span class="right small-text"><a href='all-products'>View all Products</a></span></h1>
        <section class="product-section carousel" data-flickity='{ "cellAlign": "left", "contain": true }'>
            <?php

            foreach ($product_array_recent as $product) {
                $amount_saved = $product['product_actualprice'] - $product['product_discountprice'];
                echo "<div class='product cell-carousel' data-product-id='" . $product['product_id'] . "'>
                        <div class='product-savings'><i class='fa fa-percent'></i> Save <span class='price'>$amount_saved</span></div>
                        <img class='product-image' alt='" . $product['product_name'] . "' 
                        src='/images/" . $product['product_image_url'] . "' />
                        <h3 class='product-category'><a href='" . strtolower($product['product_category']) . "'>" . $product['product_category'] . "</a></h3>
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
                            <span class='price product-actual-price'>" . $product['Product_actualprice'] . "</span>
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
            $product_array = NULL;

            ?>
        </section>
    </main>
    <?php require_once __DIR__ . "/../static/footer.html"; ?>
    <script src="/scripts/script.js"></script>
    <script src="/flickity/flickity.pkgd.min.js"></script>
</body>

</html>
