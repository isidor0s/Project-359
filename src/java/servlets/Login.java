package servlets;

import database.tables.EditLibrarianTable;
import database.tables.EditStudentsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mainClasses.Librarian;
import mainClasses.Student;

@WebServlet("/login")
public class Login extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        HttpSession session = request.getSession(true);
        session.setAttribute("loggedIn", username);
        try {
            EditStudentsTable est = new EditStudentsTable();
            EditLibrarianTable elt = new EditLibrarianTable();
            Student tmp_student = est.databaseToStudent(username);
            Librarian tmp_librarian = elt.databaseToLibrarian(username);
            if (tmp_student != null){
                if (tmp_student.getPassword().equals(password)){
                    String json = est.studentToJSON(tmp_student);
                    response.getWriter().write(json);
                    response.setStatus(200);
                }else {
                    response.getWriter().write("404 error/ Wrong Password");
                    response.setStatus(404);
                }
            } else if( tmp_librarian != null) {
                if (tmp_librarian.getPassword().equals(password)){
                    String json = elt.librarianToJSON(tmp_librarian);
                    response.getWriter().write(json);
                    response.setStatus(200);
                }else {
                    response.getWriter().write("404 error/ Wrong Password");
                    response.setStatus(404);
                }
            } else {
                response.getWriter().write("404 error/ User not found");
                response.setStatus(404);
            }
        } catch (SQLException | ClassNotFoundException ex) {
            log(ex.toString());
        }
    }
}
