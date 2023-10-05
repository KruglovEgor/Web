package server.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.regex.Pattern;

@WebServlet(urlPatterns = {"/area-checker"})
public class AreaCheckServlet extends HttpServlet {
    String floatRegex = "^-?\\d+\\.?\\d*$";
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start = System.nanoTime();

        String xInput = req.getParameter("x");
        String yInput = req.getParameter("y");
        String rInput = req.getParameter("r");

        if (xInput != null && yInput != null && rInput != null){
            if(validateX(xInput) && validateY(yInput) && validateR(rInput)){
                int x = Integer.parseInt(xInput);
                float y = Float.parseFloat(yInput);
                float r = Float.parseFloat(rInput);
                boolean hit = inSecondQuarter(x, y, r) || inThirdQuarter(x, y, r) || inForthQuarter(x, y, r);

                long executionTime = (System.nanoTime() - start) / 1000;

                //todo finish
            }
            else {
                
            }
        }else {

        }
    }

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

    private boolean inSecondQuarter(int x, float y, float r){
        return (-r <= x && x <= 0) && (0 <= y && y <=r);
    }
    private boolean inThirdQuarter(int x, float y, float r){
        return (x <= 0) && (y <= 0) && (y >= -x - r/2);
    }
    private boolean inForthQuarter(int x, float y, float r){
        return (x >= 0) && (y <= 0) && (x*x + y*y <= r*r);
    }
}
