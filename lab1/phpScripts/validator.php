<?php
function validate($x, $y, $r){
    $x_values = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    $r_values = [1, 1.5, 2, 2.5, 3];
    if(!in_array($x, $x_values)){
        return false;
    }
    elseif ($y < -5 || $y > 3){
        return false;
    }
    elseif (!in_array($r, $r_values)){
        return false;
    }
    else{
        return true;
    }
}