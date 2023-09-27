<?php
function validate($x, $y, $r){
    if (!(is_numeric($x) && is_numeric($y) && is_numeric($r))) {
        return false;
    }
    $x_values = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    $r_values = [1, 1.5, 2, 2.5, 3];
    if(!in_array($x, $x_values)){
        return false;
    }
    if ($y < -5 || $y > 3){
        return false;
    }
    if (!in_array($r, $r_values)){
        return false;
    }
    return true;
}