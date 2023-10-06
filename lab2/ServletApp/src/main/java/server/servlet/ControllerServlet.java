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
        String type = req.getParameter("type");



        if ((x != null && y != null && r != null && type != null) && ((!x.trim().isEmpty()) && (!y.trim().isEmpty()) && (!r.trim().isEmpty()) && (!type.trim().isEmpty()))){
            req.getRequestDispatcher("/area-checker").forward(req, resp);
        }
        else {
            PrintWriter out = resp.getWriter();
            out.println("We got not full packet! Try to resend it.");
            resp.setContentType("text/plain;charset=UTF-8");
            resp.sendError(400);
        }
    }
}
