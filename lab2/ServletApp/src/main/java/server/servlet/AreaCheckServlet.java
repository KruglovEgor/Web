package server.servlet;

import server.data.Result;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


//@WebServlet(urlPatterns = {"/area-checker"})
public class AreaCheckServlet extends HttpServlet {
    String floatRegex = "^-?\\d+\\.?\\d*$";
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start = System.nanoTime();
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        String xInput = req.getParameter("x").trim();
        String yInput = req.getParameter("y").trim();
        String rInput = req.getParameter("r").trim();
        String type = req.getParameter("type").trim();

        //todo change validation according to type
        if(validateX(xInput) && validateY(yInput) && validateR(rInput)){
            float x = Float.parseFloat(xInput);
            float y = Float.parseFloat(yInput);
            float r = Float.parseFloat(rInput);
            boolean hit = inSecondQuarter(x, y, r) || inThirdQuarter(x, y, r) || inForthQuarter(x, y, r);
            long executionTime = (System.nanoTime() - start) / 1000;

            Result result = new Result(x, y, r, currentTime, executionTime, hit);
            HttpSession httpSession = req.getSession(true);

            List<Result> history = (List<Result>) httpSession.getAttribute("history");
            if(history == null){
                history = new ArrayList<Result>();
                httpSession.setAttribute("history", history);
            }
            history.add(result);
        }
        //todo finish
        else {
                
            }
        //todo finish
    }


    //todo add validation for click values

    private boolean validateX(String input){
        final String[] availableValues = {"-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"};
        return Arrays.asList(availableValues).contains(input.trim());
    }

    private boolean validateY(String input){
        if (input.trim().matches(floatRegex)){
            float y = Float.parseFloat(input.trim());
            return -5 < y && y < 3;
        }
        return false;
    }


    private boolean validateR(String input){
        if (input.trim().matches(floatRegex)){
            float r = Float.parseFloat(input.trim());
            return 2 < r && r < 5;
        }
        return false;
    }

    private boolean inSecondQuarter(float x, float y, float r){
        return (-r <= x && x <= 0) && (0 <= y && y <=r);
    }
    private boolean inThirdQuarter(float x, float y, float r){
        return (x <= 0) && (y <= 0) && (y >= -x - r/2);
    }
    private boolean inForthQuarter(float x, float y, float r){
        return (x >= 0) && (y <= 0) && (x*x + y*y <= r*r);
    }
}
