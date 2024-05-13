package br.com.backend.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import br.com.backend.model.VacancyModel;

public class VacancyDAO {
    private Connection connection;

    String url = "jdbc:postgresql://kesavan.db.elephantsql.com:5432/yhplxddp";
    String userBd = "yhplxddp";
    String password = "9QyVOyvzaonnEoe1oE5K-m6BbwoiQAo_";

    public VacancyDAO() {
    }

    public VacancyDAO(String url, String user, String password) {
        try {
            connection = DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public VacancyModel createVacancy(VacancyModel vacancy) {
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "INSERT INTO \"vacancy\" (\"title\", \"description\", \"salary\", \"benefits\", \"requeriments\", \"responsabilities\", \"company_id\") VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql,
                Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, vacancy.getTitle());
            ps.setString(2, vacancy.getDescription());
            ps.setString(3, vacancy.getSalary());
            ps.setString(4, vacancy.getBenefits());
            ps.setString(5, vacancy.getRequeriments());
            ps.setString(6, vacancy.getResponsibilities());
            ps.setInt(7, vacancy.getCompanyId());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Falha ao inserir vaga, nenhum registro afetado.");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    vacancy.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Falha ao inserir vaga, nenhum ID obtido.");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancy;
    }

    public ArrayList<VacancyModel> find3LastVacancy() {
        ArrayList<VacancyModel> vacancies = new ArrayList<VacancyModel>();
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "SELECT v.*, c.\"name\" as company_name, c.email as company_email, c.description as company_description, "
                +
                "c.information as company_information, c.location as company_location " +
                "FROM \"vacancy\" v " +
                "JOIN \"company\" c ON v.company_id = c.id " +
                "ORDER BY v.\"id\" DESC LIMIT 3";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql)) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                VacancyModel vacancy = new VacancyModel();
                vacancy.setId(rs.getInt("id"));
                vacancy.setTitle(rs.getString("title"));
                vacancy.setDescription(rs.getString("description"));
                vacancy.setSalary(rs.getString("salary"));
                vacancy.setBenefits(rs.getString("benefits"));
                vacancy.setRequeriments(rs.getString("requeriments"));
                vacancy.setResponsibilities(rs.getString("responsabilities"));
                vacancy.setCompanyId(rs.getInt("company_id"));
                vacancy.setCompanyName(rs.getString("company_name"));
                vacancy.setCompanyEmail(rs.getString("company_email"));
                vacancy.setCompanyDescription(rs.getString("company_description"));
                vacancy.setCompanyInformation(rs.getString("company_information"));
                vacancy.setCompanyLocation(rs.getString("company_location"));
                vacancies.add(vacancy);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancies;
    }
}
