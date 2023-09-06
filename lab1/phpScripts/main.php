<?php

//todo написать html страницу. Перенести валидацию из php в js
//todo страничка должна быть в табличном стиле
//todo сделать svg графика в figma

require_once "validator.php";
require_once "area.php";
date_default_timezone_set('Europe/Moscow');

$start = microtime(true);
$current_time = date("d/m/y H:i:s");

if (isset($_POST["x"]) && isset($_POST["y"]) && isset($_POST["r"])) {
   $x =  $_POST["x"];
   $y = $_POST["y"];
   $r = $_POST["r"];

   if (validate($x, $y, $r)){
       $in_area = inArea($x, $y, $r) ? "<span style='color: #0fc40f'>TRUE</span>" : "<span style='color: red'>FALSE</span>";
       $execution_time = number_format(microtime(true) - $start, 8, ".", "") * 10^6;
       die(<<<_END
        <tr>
            <th style="max-width: 300px; word-wrap: break-word">$x</th>
            <th>$y</th>
            <th>$r</th>
            <th>$current_time</th>
            <th>$execution_time</th>
            <th>$in_area</th>
        </tr>
_END
       );
   }
    die("Problem with values of X, Y or R. Try again!");
}

die("Something went wrong! Try again!");
?>