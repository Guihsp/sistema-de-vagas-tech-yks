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

    public UserDAO() {
        try {
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/seu_banco_de_dados", "seu_usuario", "sua_senha");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public UserModel createUser(UserModel user) {
        String postgresql = "INSERT INTO \"user\" (\"name\", \"email\", \"password\") VALUES (?, ?, ?)";
        try  (PreparedStatement ps = connection.prepareStatement(postgresql, Statement.RETURN_GENERATED_KEYS)) {
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
}
