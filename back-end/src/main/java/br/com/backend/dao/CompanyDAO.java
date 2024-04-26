package br.com.backend.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import br.com.backend.model.CompanyModel;


public class CompanyDAO {
    private Connection connection;

    public CompanyDAO() {
        try {
            connection = DriverManager.getConnection("jdbc:postgresql://kesavan.db.elephantsql.com:5432/yhplxddp", "yhplxddp", "9QyVOyvzaonnEoe1oE5K-m6BbwoiQAo_");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public CompanyModel createCompany(CompanyModel company) {
        CompanyDAO companyDAO = new CompanyDAO();
        String postgresql = "INSERT INTO \"company\" (\"name\", \"email\", \"password\") VALUES (?, ?, ?)";
        try  (PreparedStatement ps = companyDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, company.getName());
            ps.setString(2, company.getEmail());
            ps.setString(3, company.getPassword());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Falha ao inserir empresa, nenhum registro afetado.");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    company.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Falha ao inserir empresa, nenhum ID obtido.");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return company;
    }
}
