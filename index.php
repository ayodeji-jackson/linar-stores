<?php

$request = preg_replace("/\/+/", "/", $_SERVER['REQUEST_URI']);

switch($request) {
    case "":
    case "/":
        require_once __DIR__ . "/views/home.php";
        break;
    case '/all-products':
    case '/all-products/':
        require_once __DIR__ . '/views/all-products.php';
        break;
    case '/portables':
    case '/portables/':
        require_once __DIR__ . '/views/portables.php';
        break;
    case '/computers':
    case '/computers/':
        require_once __DIR__ . '/views/computers.php';
        break;
    case '/networking':
    case '/networking/':
        require_once __DIR__ . '/views/networking.php';
    default:
        http_response_code(404);
        require_once __DIR__ . '/views/404.php';
        break;
}

?>