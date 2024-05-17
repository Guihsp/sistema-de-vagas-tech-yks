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

@WebServlet("/api/updateCompany/*")
public class UpdateCompany extends HttpServlet {
    private CompanyDAO companyDAO;

    public UpdateCompany() {
        this.companyDAO = new CompanyDAO();
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "PUT");
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

            CompanyModel updatedUser = gson.fromJson(jsonBody.toString(), CompanyModel.class);
            
            String[] pathInfo = request.getPathInfo().split("/");
            int userId = Integer.parseInt(pathInfo[1]);
            updatedUser.setId(userId);
            CompanyModel result = companyDAO.updateCompany(updatedUser);

            String jsonResponse = gson.toJson(result);
            out.println(jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao atualizar usuário");
            out.println(errorMessage);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
