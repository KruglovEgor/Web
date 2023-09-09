<?php

//todo написать html страницу. Перенести валидацию из php в js
//todo страничка должна быть в табличном стиле
//todo сделать svg графика в figma

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
        die("Problem with values of X, Y or R. Try again!");
    }
    die(json_encode($_POST));
    //die("Something went wrong! Try again!");
}
else{
    echo("We expect POST method");
}

?>
