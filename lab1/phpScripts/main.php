<?php

//todo возможно разнести sender.js на несколько отдельных файлов js
//todo посмотреть нейминг переменных возможно сделать все в одном стиле
//todo оптимизировать pageHistory.js и возможно заняться неймингом
//todo возможно добавить стили для счетчика страниц и кнопок перелистывания

require_once "validator.php";
require_once "area.php";
date_default_timezone_set('Europe/Moscow');

$start = microtime(true);
$current_time = date("d/m/y H:i:s");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if(isset($_POST["x"]) && isset($_POST["y"]) && isset($_POST["r"])){
        $x = $_POST["x"];
        $y = $_POST["y"];
        $r = $_POST["r"];

        if (validate($x, $y, $r)) {
            $in_area = inArea($x, $y, $r) ? "TRUE" : "FALSE";
            $execution_time = intval(number_format(microtime(true) - $start, 8, ".", "") * 1e6);
            http_response_code(200);
            $response = [
                "x" => $x,
                "y" => $y,
                "r" => $r,
                "time" => $current_time,
                "execution_time" => $execution_time,
                "hit" => $in_area
            ];
            die(json_encode($response, JSON_UNESCAPED_SLASHES));
        }
        http_response_code(400);
        die("Problem with values of X, Y or R. Try again!");
    }
    http_response_code(400);
    die("We got not full packet. Try again!");
}
else{
    http_response_code(405);
    die("We only expect POST method!");
}
