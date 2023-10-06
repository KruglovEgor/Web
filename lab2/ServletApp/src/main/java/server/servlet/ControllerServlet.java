package server.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

import java.io.*;


//@WebServlet(urlPatterns = {"/controller"})
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");
//        PrintWriter out = resp.getWriter();
//        out.println("Received x: " + x);
//        out.println("Received y: " + y);
//        out.println("Received r: " + r);
//        resp.setContentType("text/plain;charset=UTF-8");


        if ((x != null && y != null && r != null) && ((x.trim().length() != 0) && (y.trim().length() != 0) && (r.trim().length() != 0))){
            req.getRequestDispatcher("/area-checker").forward(req, resp);
        }
        else {
            resp.sendError(400);
        }
    }
}
