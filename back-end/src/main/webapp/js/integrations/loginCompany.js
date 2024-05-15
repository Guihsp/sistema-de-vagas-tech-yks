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
            const company = xhr.responseText;
            localStorage.removeItem("company");
            localStorage.removeItem("user");
            localStorage.setItem("company", company);
            window.location.href = "./pagina_vagas_abertas.html";
        } else {
            console.error("Erro ao fazer login:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    companyLogin();
});