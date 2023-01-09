package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "Logout", urlPatterns = {"/Logout"})
public class Logout extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            HttpSession session = request.getSession();
            if (session.getAttribute("loggedIn") != null) {
                session.invalidate();
                response.setStatus(200);
                response.getWriter().write("Log Out Succeed");
            } else {
                response.setStatus(403);
                response.getWriter().write("Can not Log Out");
            }
        } catch (Exception e){
            response.getWriter().write(e.toString());
        }
    }
}

