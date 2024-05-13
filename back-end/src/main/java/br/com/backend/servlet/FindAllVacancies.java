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

@WebServlet("/api/findAllVacancies")
public class FindAllVacancies extends HttpServlet {
    private VacancyDAO vacancyDAO;

    public FindAllVacancies() {
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
            ArrayList<VacancyModel> vacancies = vacancyDAO.getAllVacancies();
            String jsonResponse = gson.toJson(vacancies);
            out.println(jsonResponse);
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
