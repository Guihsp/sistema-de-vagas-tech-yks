function createUser() {
    const userData = {
        name: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
    };

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/createUser";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Usuário criado com sucesso!");
        } else {
            console.error("Erro ao criar usuário:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}

document.getElementById("cadastrarButton").addEventListener("click", function () {
    createUser();
});