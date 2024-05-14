package br.com.backend.servlet;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import br.com.backend.dao.CompanyDAO;
import br.com.backend.model.CompanyModel;

@WebServlet("/api/companyLogin")
public class CompanyLogin extends HttpServlet {
    private CompanyDAO companyDAO;

    public CompanyLogin() {
        this.companyDAO = new CompanyDAO();
    }

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

        CompanyModel loginCredentials = gson.fromJson(jsonBody.toString(), CompanyModel.class);

        if (loginCredentials != null && !loginCredentials.getEmail().isEmpty() && !loginCredentials.getPassword().isEmpty()) {
            CompanyModel company = companyDAO.login(loginCredentials.getEmail(), loginCredentials.getPassword());

            if (company != null) {
                String jsonResponse = gson.toJson(company);
                out.println(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                String errorMessage = gson.toJson("Credenciais inválidas");
                out.println(errorMessage);
            }
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            String errorMessage = gson.toJson("Parâmetros de email e senha são obrigatórios");
            out.println(errorMessage);
        }
    } catch (Exception e) {
        e.printStackTrace();
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        String errorMessage = gson.toJson("Erro ao fazer login da empresa");
        out.println(errorMessage);
    } finally {
        out.flush();
        out.close();
    }
}


    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}