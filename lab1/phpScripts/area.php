<?php

function inArea($x, $y, $r){
    if (0 <= $x && $x <= $r/2 && $y <= 0 && $y >= -$r){
        return true;
    }
    elseif ($y >= 0 && $x <= 0 && $y<=$x+$r/2){
        return true;
    }
    elseif ($x <= 0 && $y <= 0 && $x*$x+$y*$y <= $r*$r){
        return true;
    }
    else{
        return false;
    }
}