<?php

$request = preg_replace("/\/+/", "/", $_SERVER['REQUEST_URI']);

switch($request) {
    case "":
    case "/":
        require __DIR__ . "/views/home.php";
        break;
    case '/all-products':
    case '/all-products/':
        require __DIR__ . '/views/all-products.php';
        break;
    default:
        http_response_code(404);
        require __DIR__ . '/views/404.php';
        break;
}

?>