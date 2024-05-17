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
    String password = "qK1PIX6oV92RAwOGYzqf4kA40NPk8Ohn";

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
        String postgresql = "INSERT INTO \"vacancy\" (\"title\", \"description\", \"salary\", \"requeriments\", \"location\", \"company_id\") VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql,
                Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, vacancy.getTitle());
            ps.setString(2, vacancy.getDescription());
            ps.setString(3, vacancy.getSalary());
            ps.setString(4, vacancy.getRequeriments());
            ps.setString(5, vacancy.getLocation());
            ps.setInt(6, vacancy.getCompanyId());

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
                "c.cnpj as company_cnpj, c.location as company_location " +
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
                vacancy.setRequeriments(rs.getString("requeriments"));
                vacancy.setCompanyId(rs.getInt("company_id"));
                vacancy.setCompanyName(rs.getString("company_name"));
                vacancy.setCompanyEmail(rs.getString("company_email"));
                vacancy.setCompanyDescription(rs.getString("company_description"));
                vacancy.setCompanyCnpj(rs.getString("company_cnpj"));
                vacancy.setLocation(rs.getString("location"));
                vacancies.add(vacancy);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancies;
    }

    public ArrayList<VacancyModel> getAllVacancies() {
        ArrayList<VacancyModel> vacancies = new ArrayList<VacancyModel>();
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "SELECT v.*, c.\"name\" as company_name, c.email as company_email, c.description as company_description, "
                +
                "c.cnpj as company_cnpj, c.location as company_location " +
                "FROM \"vacancy\" v " +
                "JOIN \"company\" c ON v.company_id = c.id " +
                "ORDER BY v.\"id\" DESC";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql)) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                VacancyModel vacancy = new VacancyModel();
                vacancy.setId(rs.getInt("id"));
                vacancy.setTitle(rs.getString("title"));
                vacancy.setDescription(rs.getString("description"));
                vacancy.setSalary(rs.getString("salary"));
                vacancy.setRequeriments(rs.getString("requeriments"));
                vacancy.setCompanyId(rs.getInt("company_id"));
                vacancy.setCompanyName(rs.getString("company_name"));
                vacancy.setCompanyEmail(rs.getString("company_email"));
                vacancy.setCompanyDescription(rs.getString("company_description"));
                vacancy.setCompanyCnpj(rs.getString("company_cnpj"));
                vacancy.setLocation(rs.getString("location"));
                vacancies.add(vacancy);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancies;
    }

    public void applyVacancy(int userId, int vacancyId) {
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "INSERT INTO \"candidates\" (\"user_id\", \"vacancy_id\") VALUES (?, ?)";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql)) {
            ps.setInt(1, userId);
            ps.setInt(2, vacancyId);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public VacancyModel getVacancyById(int id) {
        VacancyModel vacancy = new VacancyModel();
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "SELECT v.*, c.\"name\" as company_name, c.email as company_email, c.description as company_description, "
                +
                "c.cnpj as company_cnpj, c.location as company_location " +
                "FROM \"vacancy\" v " +
                "JOIN \"company\" c ON v.company_id = c.id " +
                "WHERE v.id = ? ";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                vacancy.setId(rs.getInt("id"));
                vacancy.setTitle(rs.getString("title"));
                vacancy.setDescription(rs.getString("description"));
                vacancy.setSalary(rs.getString("salary"));
                vacancy.setRequeriments(rs.getString("requeriments"));
                vacancy.setCompanyId(rs.getInt("company_id"));
                vacancy.setCompanyName(rs.getString("company_name"));
                vacancy.setCompanyEmail(rs.getString("company_email"));
                vacancy.setCompanyDescription(rs.getString("company_description"));
                vacancy.setCompanyCnpj(rs.getString("company_cnpj"));
                vacancy.setLocation(rs.getString("location"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancy;
    }

    public ArrayList<VacancyModel> getVacanciesByCompanyId(int companyId) {
        ArrayList<VacancyModel> vacancies = new ArrayList<VacancyModel>();
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "SELECT v.*, c.\"name\" as company_name, c.email as company_email, c.description as company_description, "
                +
                "c.cnpj as company_cnpj, c.location as company_location " +
                "FROM \"vacancy\" v " +
                "JOIN \"company\" c ON v.company_id = c.id " +
                "WHERE v.company_id = ? " + // Adicionando a cláusula WHERE
                "ORDER BY v.\"id\" DESC";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql)) {
            ps.setInt(1, companyId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                VacancyModel vacancy = new VacancyModel();
                vacancy.setId(rs.getInt("id"));
                vacancy.setTitle(rs.getString("title"));
                vacancy.setDescription(rs.getString("description"));
                vacancy.setSalary(rs.getString("salary"));
                vacancy.setRequeriments(rs.getString("requeriments"));
                vacancy.setCompanyId(rs.getInt("company_id"));
                vacancy.setCompanyName(rs.getString("company_name"));
                vacancy.setCompanyEmail(rs.getString("company_email"));
                vacancy.setCompanyDescription(rs.getString("company_description"));
                vacancy.setCompanyCnpj(rs.getString("company_cnpj"));
                vacancy.setLocation(rs.getString("location"));
                vacancies.add(vacancy);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancies;
    }

    public ArrayList<VacancyModel> getVacanciesByUserId(int user_id) {
        ArrayList<VacancyModel> vacancies = new ArrayList<VacancyModel>();
        VacancyDAO vacancyDAO = new VacancyDAO(url, userBd, password);
        String postgresql = "SELECT v.*, c.\"name\" as company_name, c.email as company_email, c.description as company_description, "
                +
                "c.cnpj as company_cnpj, c.location as company_location " +
                "FROM \"vacancy\" v " +
                "JOIN \"company\" c ON v.company_id = c.id " +
                "JOIN \"candidates\" ca ON v.id = ca.vacancy_id " +
                "WHERE ca.user_id = ? " +
                "ORDER BY v.\"id\" DESC";
        try (PreparedStatement ps = vacancyDAO.connection.prepareStatement(postgresql)) {
            ps.setInt(1, user_id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                VacancyModel vacancy = new VacancyModel();
                vacancy.setId(rs.getInt("id"));
                vacancy.setTitle(rs.getString("title"));
                vacancy.setDescription(rs.getString("description"));
                vacancy.setSalary(rs.getString("salary"));
                vacancy.setRequeriments(rs.getString("requeriments"));
                vacancy.setCompanyId(rs.getInt("company_id"));
                vacancy.setCompanyName(rs.getString("company_name"));
                vacancy.setCompanyEmail(rs.getString("company_email"));
                vacancy.setCompanyDescription(rs.getString("company_description"));
                vacancy.setCompanyCnpj(rs.getString("company_cnpj"));
                vacancy.setLocation(rs.getString("location"));
                vacancies.add(vacancy);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vacancies;
    }
}
