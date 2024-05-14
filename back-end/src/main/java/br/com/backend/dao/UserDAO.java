package br.com.backend.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import br.com.backend.model.UserModel;

public class UserDAO {
    private Connection connection;

    String url = "jdbc:postgresql://kesavan.db.elephantsql.com:5432/yhplxddp";
    String userBd = "yhplxddp";
    String password = "9QyVOyvzaonnEoe1oE5K-m6BbwoiQAo_";

    public UserDAO() {
    }

    public UserDAO(String url, String user, String password) {
        try {
            connection = DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public UserModel createUser(UserModel user) {
        UserDAO userDAO = new UserDAO(url, userBd, password);
        String postgresql = "INSERT INTO \"user\" (\"name\", \"email\", \"password\") VALUES (?, ?, ?)";
        try  (PreparedStatement ps = userDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Falha ao inserir usuario, nenhum registro afetado.");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    user.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Falha ao inserir usuario, nenhum ID obtido.");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    public UserModel getUserByEmail(String email) {
        UserDAO userDAO = new UserDAO(url, userBd, password);
        UserModel user = new UserModel();
        String postgresql = "SELECT * FROM \"user\" WHERE email = ?";
        try  (PreparedStatement ps = userDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            rs.next();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setInformation(rs.getString("information"));
            user.setPhoneNumber(rs.getString("phoneNumber"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    public UserModel getUserById(int id) {
        UserDAO userDAO = new UserDAO(url, userBd, password);
        UserModel user = new UserModel();
        String postgresql = "SELECT * FROM \"user\" WHERE id = ?";
        try  (PreparedStatement ps = userDAO.connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            rs.next();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setInformation(rs.getString("information"));
            user.setPhoneNumber(rs.getString("phoneNumber"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}
