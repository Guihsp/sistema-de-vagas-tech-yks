package br.com.backend.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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
        System.out.println(vacancy.getBenefits()+ " teste " + vacancy.getDescription()+ " teste " + vacancy.getRequeriments()+ " teste " + vacancy.getResponsibilities()+ " teste " + vacancy.getSalary()+ " teste " + vacancy.getTitle());
        String postgresql = "INSERT INTO \"vacancy\" (\"title\", \"description\", \"salary\", \"benefits\", \"requeriments\", \"responsabilities\", \"company_id\") VALUES (?, ?, ?, ?, ?, ?, ?)";
        try  (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
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
    
}
