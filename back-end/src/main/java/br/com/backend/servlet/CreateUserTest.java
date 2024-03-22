package br.com.backend.servlet;

import br.com.backend.dao.UserDAO;
import br.com.backend.model.UserModel;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CreateUserTest {

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private UserDAO userDAO;

    private StringWriter stringWriter;
    private PrintWriter writer;

    @InjectMocks
    private CreateUser servlet;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        stringWriter = new StringWriter();
        writer = new PrintWriter(stringWriter);

        try {
            when(response.getWriter()).thenReturn(writer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testDoPost() throws IOException {
        String jsonUser = "{\"name\": \"João Silva\",\"email\": \"joao.silva@example.com\", \"password\": \"senha@123\", \"phoneNumber\": \"+5511987654321\",\"information\": \"Desenvolvedor Java experiente\"}";
        BufferedReader reader = new BufferedReader(new StringReader(jsonUser));
        when(request.getReader()).thenReturn(reader);

        UserModel user = new UserModel("João Silva", "joao.silva@example.com", "senha@123", "+5511987654321", "Desenvolvedor Java experiente");
        when(userDAO.createUser(any(UserModel.class))).thenReturn(user);

        servlet.doPost(request, response);

        writer.flush();

        String jsonResponse = stringWriter.toString().trim();
        System.out.println(jsonResponse);

        Gson gson = new Gson();
        String expectedResponse = gson.toJson(new Object[]{user.getEmail(), user.getName(), user.getPhoneNumber(), user.getInformation(), user.getPassword()});

        assertEquals(expectedResponse, jsonResponse);

        // Verifica se o método createUser foi chamado com o usuário correto
        verify(userDAO, times(1)).createUser(any(UserModel.class));
    }
}
