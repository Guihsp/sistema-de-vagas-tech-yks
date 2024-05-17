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

    String url = "jdbc:postgresql://tech-yks.postgres.database.azure.com/postgres";
    String userBd = "tech";
    String password = "entregaPI.2024";

    public CompanyDAO() {
    }

    public CompanyDAO(String url, String user, String password) {
        try {
            connection = DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public CompanyModel createCompany(CompanyModel company) {
        CompanyDAO companyDAO = new CompanyDAO(url, userBd, password);
        String postgresql = "INSERT INTO \"company\" (\"name\", \"email\", \"password\") VALUES (?, ?, ?)";
        try (PreparedStatement ps = companyDAO.connection.prepareStatement(postgresql,
                Statement.RETURN_GENERATED_KEYS)) {
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

    public CompanyModel login(String email, String companyPassword) {
        CompanyModel company = null;
        String query = "SELECT * FROM company WHERE email = ? AND password = ?";

        try (Connection connection = DriverManager.getConnection(url, userBd, password);
                PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, email);
            ps.setString(2, companyPassword);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String description = rs.getString("description");
                    String cnpj = rs.getString("cnpj");
                    String location = rs.getString("location");

                    company = new CompanyModel(id, name, email, description, cnpj, location);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return company;
    }

    public CompanyModel getCompanyByEmail(String email) {
        CompanyModel company = null;
        String query = "SELECT * FROM company WHERE email = ?";

        try (Connection connection = DriverManager.getConnection(url, userBd, password);
                PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, email);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    String password = rs.getString("password");
                    String description = rs.getString("description");
                    String cnpj = rs.getString("cnpj");
                    String location = rs.getString("location");

                    company = new CompanyModel(id, name, email, password, description, cnpj, location);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return company;
    }

    public CompanyModel getUserByEmail(String email) {
        CompanyDAO companyDAO = new CompanyDAO(url, userBd, password);
        CompanyModel company = new CompanyModel();
        String postgresql = "SELECT * FROM \"company\" WHERE email = ?";
        try (PreparedStatement ps = companyDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            rs.next();
            company.setId(rs.getInt("id"));
            company.setName(rs.getString("name"));
            company.setEmail(rs.getString("email"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return company;
    }

    public CompanyModel getCompanyById(int id) {
        CompanyModel company = null;
        String query = "SELECT * FROM company WHERE id = ?";

        try (Connection connection = DriverManager.getConnection(url, userBd, password);
                PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String name = rs.getString("name");
                    String email = rs.getString("email");
                    String description = rs.getString("description");
                    String cnpj = rs.getString("cnpj");
                    String location = rs.getString("location");

                    company = new CompanyModel(id, name, email, description, cnpj, location);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return company;
    }

    public CompanyModel updateCompany(CompanyModel company) {
        CompanyDAO companyDAO = new CompanyDAO(url, userBd, password);
        String postgresql = "UPDATE \"company\" SET \"name\" = ?, \"email\" = ?, \"description\" = ?, \"cnpj\" = ?, \"location\" = ? WHERE \"id\" = ?";
        try (PreparedStatement ps = companyDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, company.getName());
            ps.setString(2, company.getEmail());
            ps.setString(3, company.getDescription());
            ps.setString(4, company.getCnpj());
            ps.setString(5, company.getLocation());
            ps.setInt(6, company.getId());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Falha ao atualizar empresa, nenhum registro afetado.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return company;
    }
}
