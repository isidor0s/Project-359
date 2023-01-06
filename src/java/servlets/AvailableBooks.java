package servlets;

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Book;
import database.tables.EditBooksTable;

@WebServlet(name = "AvailableBooks", urlPatterns = {"/AvailableBooks"})
public class AvailableBooks extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String responseToClient = "[";
        EditBooksTable av_books = new EditBooksTable();
        ArrayList<Book> books;
        try {
            books = av_books.databaseToBooks();
            for (Book book : books) {
                responseToClient += av_books.bookToJSON(book) + ",";
            }
            responseToClient = responseToClient.substring(0, responseToClient.length() - 1);
            responseToClient += "]";

        } catch (Exception e) {
            log(e.toString());
        }
        response.setStatus(200);
        response.getWriter().write(responseToClient);
        response.getWriter().flush();
    }

}
