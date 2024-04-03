package br.com.backend.servlet;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.backend.dao.UserDAO;
import br.com.backend.model.UserModel;

@WebServlet("/api/createUser")
public class CreateUser extends HttpServlet {
    private UserDAO userDAO;

    public CreateUser() {
        this.userDAO = new UserDAO();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        try {
            BufferedReader reader = request.getReader();
            StringBuilder jsonBody = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBody.append(line);
            }

            UserModel newUser = gson.fromJson(jsonBody.toString(), UserModel.class);

            UserModel createdUser = userDAO.createUser(newUser);

            String jsonResponse = gson.toJson(new Object[]{createdUser.getEmail(), createdUser.getName()});
            out.println(jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao criar usuário");
            out.println(errorMessage);
        }
    }
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Configuração do CORS para requisições OPTIONS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
