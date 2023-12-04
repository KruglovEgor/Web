package ru.itmo.lab4.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class MainController {
    @GetMapping("/start")
    public String showStartPage() {
        return "start";
    }


    @GetMapping("/main")
    public String showMainPage() {
        return "main";
    }
}
