package br.com.backend.servlet;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

import br.com.backend.dao.VacancyDAO;
import br.com.backend.model.VacancyModel;

@WebServlet("/api/getVacanciesByCompanyId/*")
public class GetVacanciesByCompanyId extends HttpServlet {
    private VacancyDAO vacancyDAO;

    public GetVacanciesByCompanyId() {
        this.vacancyDAO = new VacancyDAO();
    }
    
    @Override
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
                ArrayList<VacancyModel> vacancies = vacancyDAO.getVacanciesByCompanyId(idInt);
                String jsonResponse = gson.toJson(vacancies);
                out.println(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                String errorMessage = gson.toJson("Email não encontrado");
                out.println(errorMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao buscar vagas");
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
