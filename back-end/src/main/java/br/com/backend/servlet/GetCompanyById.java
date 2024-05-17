package br.com.backend.servlet;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.backend.dao.CompanyDAO;
import br.com.backend.model.CompanyModel;

@WebServlet("/api/getCompanyById/*")
public class GetCompanyById extends HttpServlet {
    private CompanyDAO companyDAO;

    public GetCompanyById() {
        this.companyDAO = new CompanyDAO();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        try {
            String[] pathParts = request.getPathInfo().split("/");
            if (pathParts.length > 1) {
                String id = pathParts[1];
                int idInt = Integer.parseInt(id);
                CompanyModel company = companyDAO.getCompanyById(idInt);
                String jsonResponse = gson.toJson(company);
                out.println(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                String errorMessage = gson.toJson("Empresa não encontrado");
                out.println(errorMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao buscar empresa");
            out.println(errorMessage);
        }
    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
