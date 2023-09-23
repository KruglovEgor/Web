<?php

//todo возможно закрепить часы
//todo возможно сделать историю по 10 запросов, а дальше перелистывание
//todo возможно разнести sender.js на несколько отдельных файлов js
//todo посмотреть нейминг переменных возможно сделать все в одном стиле


require_once "validator.php";
require_once "area.php";
date_default_timezone_set('Europe/Moscow');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $start = microtime(true);
    $current_time = date("d/m/y H:i:s");

    $data = json_decode(file_get_contents('php://input'), true);

    if ($data !== null && isset($data["x"]) && isset($data["y"]) && isset($data["r"])) {
        $x = $data['x'];
        $y = $data['y'];
        $r = $data['r'];
        if (validate($x, $y, $r)) {
            $in_area = inArea($x, $y, $r) ? "TRUE" : "FALSE";
            $execution_time = number_format(microtime(true) - $start, 8, ".", "") * 10 ^ 6;
            die(<<<_END
{"x": $x, "y": $y, "r": $r, "time": "$current_time", "execution_time": $execution_time, "hit": "$in_area"}
_END
            );
        }
        http_response_code(400);
        die("Problem with values of X, Y or R. Try again!");
    }
    http_response_code(400);
    die("We got not full packet. Try again!");
}
else{
    http_response_code(405);
    echo("We only expect POST method!");
}
?>