<?php
require_once('app_config.php');

$category_table = new AppConfig;
$category_array = $category_table->readAll("Category");
$product_table = new AppConfig;
$product_array = $product_table->readAll("Product");

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="images/logo.png" />
    <link rel="stylesheet" href="fontawesome/css/all.css" />
    <link rel="stylesheet" href="flickity/flickity.min.css" media="screen" />
    <link rel="stylesheet" href="styles/styles.css" />
    <title>Linar Stores</title>
</head>

<body>
    <?php require_once('navBar.html') ?>
    <aside>
        <div class="hero">
            <h6 class="hero-promo">25% off promotional sale</h6>
            <h1 class="hero-main-text">The tech store just for you.</h1>
            <h5 class="hero-side-text">What do you want?</h5>
            <button class="hero-button"><span class='button-text'>Browse Products</span></button>
        </div>
    </aside>
    <main>
        <section class="category-section carousel" data-flickity='{ "cellAlign": "left", "contain": true }'>
            <?php

            foreach ($category_array as $category) {
                echo "<div class='category cell-carousel'>
                        <img class='category-image' alt='" . $category['Category_Name'] . "' src='images/" . $category['Category_Image_URL'] . "' />
                        <h3>" . $category['Category_Name'] . "</h3>
                        <p>" . $category['Category_Description'] . "</p>
                        <button class='category-button'><span class='button-text'>Shop Now</span></button>
                    </div>";
            }
            $category_array = NULL;

            ?>
        </section>
        <h1 class="section-heading">Recently Added <span class="right small-text"><a href='/allProducts'>View all Products</a></span></h1>
        <section class="product-section carousel" data-flickity='{ "cellAlign": "left", "contain": true }'>
            <?php

            foreach ($product_array as $product) {
                echo "<div class='product cell-carousel' data-product-id='" . $product['Product_Id'] . "'>
                        <img class='product-image' alt='" . $product['Product_Name'] . "' 
                        src='images/" . $product['Product_Image_URL'] . "' />
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
                        <button class='add-to-cart-button' onclick='addToCart(this)'><span class='button-text'>Add to cart <i class='fa fa-shopping-cart'></i></span></button>
                    </div>";
            }
            $product_array = NULL;

            ?>
        </section>
    </main>
    <script src="scripts/script.js"></script>
    <script src="flickity/flickity.pkgd.min.js"></script>
</body>

</html>