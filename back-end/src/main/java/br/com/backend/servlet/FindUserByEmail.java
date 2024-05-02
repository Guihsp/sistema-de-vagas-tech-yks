package br.com.backend.servlet;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import br.com.backend.dao.UserDAO;
import br.com.backend.model.UserModel;

@WebServlet("/api/findUserByEmail/*")
public class FindUserByEmail extends HttpServlet {
    private UserDAO userDAO;

    public FindUserByEmail() {
        this.userDAO = new UserDAO();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Configuração dos cabeçalhos CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        try {
            String[] pathParts = request.getPathInfo().split("/");
            if (pathParts.length > 1) {
                String email = pathParts[1];
                UserModel user = userDAO.getUserByEmail(email);
                String jsonResponse = gson.toJson(user);
                out.println(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                String errorMessage = gson.toJson("Email não encontrado");
                out.println(errorMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao buscar usuário");
            out.println(errorMessage);
        }
    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Configuração dos cabeçalhos CORS para requisições OPTIONS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
