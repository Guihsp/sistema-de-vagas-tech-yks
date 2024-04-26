function createCompany() {
    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    password = document.getElementById("password").value
    confirmPassword = document.getElementById("confirm-password").value
    if(password != confirmPassword){
        alert("Senhas não conferem")
        return
    }

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/createCompany";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Empresa criado com sucesso!");
        } else {
            console.error("Erro ao criar empresa:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}

document.getElementById("cadastrarButton").addEventListener("click", function () {
    createCompany();
});