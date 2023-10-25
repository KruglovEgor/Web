package server.servlet;

import server.data.Result;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static server.data.validation.Validator.validate;


public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start = System.nanoTime();
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        String xInput = req.getParameter("x").trim();
        String yInput = req.getParameter("y").trim();
        String rInput = req.getParameter("r").trim();
        String type = req.getParameter("type").trim();

        PrintWriter out = resp.getWriter();
        resp.setContentType("text/plain;charset=UTF-8");


        if(validate(xInput, yInput, rInput, type)){
            float x = Float.parseFloat(xInput);
            float y = Float.parseFloat(yInput);
            float r = Float.parseFloat(rInput);
            boolean hit = inSecondQuarter(x, y, r) || inThirdQuarter(x, y, r) || inForthQuarter(x, y, r);
            long executionTime = (System.nanoTime() - start) / 1000;

            Result result = new Result(x, y, r, currentTime, executionTime, hit);
            HttpSession httpSession = req.getSession(true);

            List<Result> history = (List<Result>) httpSession.getAttribute("history");
            if(history == null){
                history = new ArrayList<>();
                httpSession.setAttribute("history", history);
            }
            history.add(result);
            req.setAttribute("result", result);
            req.getRequestDispatcher("/result.jsp").forward(req, resp);
            //out.println(result.toJson());
        }
        else {
            out.println("There are problems with values! Try to resend packet.");
            //todo check code according to the 1st lab
            resp.sendError(403);
        }
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
