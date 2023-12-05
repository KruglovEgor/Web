package ru.itmo.lab4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import ru.itmo.lab4.models.User;
import ru.itmo.lab4.repositories.UserRepository;

import java.util.Map;


@Controller
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping({"/", "/auth"})
    public String showAuthPage() {
        return "auth";
    }

//    @GetMapping("/signin")
//    public String showSignInPage() {
//        return "signin";
//    }

    @GetMapping("/register")
    public String showRegisterPage(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

//todo this thing
//    @PostMapping("/signin")
//    public String signIn(){
//        return "redirect:/start";
//    }


    @PostMapping("/register")
    public String register(User user, Map<String, Object> model) {

        User userFromDB = userRepository.findByUsername(user.getUsername());

        if(userFromDB != null){
            model.put("message", "User exists!");
            return "register";
        }

        user.setActive(true);
        userRepository.save(user);

        return "redirect:/signin";
    }


}
