package br.com.backend.servlet;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.backend.dao.VacancyDAO;

@WebServlet("/api/applyVacancy")
public class ApplyVacancy extends HttpServlet {

    private VacancyDAO vacancyDAO;

    public ApplyVacancy() {
        this.vacancyDAO = new VacancyDAO();
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

            JsonRequest json = gson.fromJson(jsonBody.toString(), JsonRequest.class);

            int userId = json.getUser_id();
            int vacancyId = json.getVacancy_id();

            vacancyDAO.applyVacancy(userId, vacancyId);

            String jsonResponse = gson.toJson(new Object[]{"Candidatura realizada com sucesso"});
            
            out.println(jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao criar vaga");
            out.println(errorMessage);
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

class JsonRequest {
    private int user_id;
    private int vacancy_id;

    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    public int getVacancy_id() {
        return vacancy_id;
    }
    public void setVacancy_id(int vacancy_id) {
        this.vacancy_id = vacancy_id;
    }
}
