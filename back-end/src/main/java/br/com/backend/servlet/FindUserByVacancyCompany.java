package br.com.backend.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.backend.dao.UserDAO;
import br.com.backend.model.UserModel;

@WebServlet("/api/findUsersByVacancy/*")
public class FindUserByVacancyCompany extends HttpServlet {
    private UserDAO userDAO;

    public FindUserByVacancyCompany() {
        this.userDAO = new UserDAO();
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
            int vacancyId = Integer.parseInt(pathParts[1]);
            List<UserModel> users = userDAO.getUsersByVacancy(vacancyId);
            String jsonResponse = gson.toJson(users);
            out.println(jsonResponse);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            String errorMessage = gson.toJson("ID da vaga inválido");
            out.println(errorMessage);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorMessage = gson.toJson("Erro ao buscar usuários");
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