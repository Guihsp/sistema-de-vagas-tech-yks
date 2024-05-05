function companyLogin() {
    const userData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/companyLogin";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Login de empresa bem-sucedido!");
            // Redirecionar ou fazer outras ações após o login bem-sucedido
            window.location.href = "createVacancy.html";
        } else {
            console.error("Erro ao fazer login:", xhr.responseText);
            // Exibir mensagem de erro para o usuário
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
        // Exibir mensagem de erro para o usuário
    };

    xhr.send(jsonData);
}

// loginCompany.js
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    companyLogin();
});