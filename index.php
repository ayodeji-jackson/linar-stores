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
    case '/portables':
    case '/portables/':
        require __DIR__ . '/views/portables.php';
        break;
    case '/desktops':
    case '/desktops/':
        require __DIR__ . '/views/desktops.php';
        break;
    case '/networking':
    case '/networking/':
        require __DIR__ . '/views/networking.php';
    default:
        http_response_code(404);
        require __DIR__ . '/views/404.php';
        break;
}

?>