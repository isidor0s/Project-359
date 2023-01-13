package servlets;

import com.google.gson.Gson;
import database.tables.EditStudentsTable;
import mainClasses.Student;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "UpdateStudentInfo", value = "/UpdateStudentInfo")
public class UpdateStudentInfo extends HttpServlet {

    EditStudentsTable studentsTable= new EditStudentsTable();
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String username = request.getParameter("username");
        String[] field = {"password", "firstname", "lastname", "birthdate", "gender",
                          "country", "city", "address", "telephone", "personalpage"};
        try{
            for (int i = 0 ; i < 9 ; i++)
                studentsTable.updateStudent(username,field[i], request.getParameter(field[i]));
            response.setStatus(200);
            response.getWriter().write("Student info Updated");
        } catch (Exception e){
            response.setStatus(404);
            response.getWriter().write(e.toString());
            System.out.println(e.toString());
        }
    }


}
