package servlets;

import database.tables.EditLibrarianTable;
import database.tables.EditStudentsTable;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "UpdateInfo", value = "/UpdateInfo")
public class UpdateInfo extends HttpServlet {

    EditStudentsTable studentsTable= new EditStudentsTable();
    EditLibrarianTable librariansTable= new EditLibrarianTable();
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String username = request.getParameter("username");
        String type = request.getParameter("type");
        String[] Commonfield = {"password", "firstname", "lastname", "birthdate", "gender",
                          "country", "city", "address", "telephone", "personalpage","lat", "lon"};
        String[] LibOnlyfield = {"email", "libraryinfo", "libraryname"};
        try{
            if(type.equals("student")) {
                for (int i = 0; i < 12; i++)
                    studentsTable.updateStudent(username, Commonfield[i], request.getParameter(Commonfield[i]));
            } else if(type.equals("librarian")) {
                for (int i = 0; i < 12; i++)
                    librariansTable.updateLibrarian(username, Commonfield[i], request.getParameter(Commonfield[i]));
                for (int i = 0 ; i < 3 ; i++)
                    librariansTable.updateLibrarian(username, LibOnlyfield[i], request.getParameter(LibOnlyfield[i]));
            }
            response.setStatus(200);
            response.getWriter().write("Student info Updated");
        } catch (Exception e){
            response.setStatus(404);
            response.getWriter().write(e.toString());
            System.out.println(e.toString());
        }
    }


}
