package server.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(urlPatterns = {"/controller"})
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");

        if ((x != null && y != null && r != null) && ((x.trim().length() != 0) && (y.trim().length() != 0) && (r.trim().length() != 0))){
            req.getRequestDispatcher("/area-checker").forward(req, resp);
        }
        else {
            resp.sendError(400);
        }
    }
}
