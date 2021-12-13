<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case "":
    case "/":
        require_once __DIR__ . "/views/home.php";
        break;
    case (preg_match('/^\/all-products(\/*|\?q=.+)$/', $request) ? true : false):
        require_once __DIR__ . '/views/all-products.php';
        break;
    case (preg_match('/^\/portables(\/*|\?q=.+)$/', $request) ? true : false):
        require_once __DIR__ . '/views/portables.php';
        break;
    case (preg_match('/^\/computers(\/*|\?q=.+)$/', $request) ? true : false):
        require_once __DIR__ . '/views/computers.php';
        break;
    case (preg_match('/^\/networking(\/*|\?q=.+)$/', $request) ? true : false):
        require_once __DIR__ . '/views/networking.php';
        break;
    default:
        http_response_code(404);
        require_once __DIR__ . '/views/404.php';
        break;
}
