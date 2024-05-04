function createCompany() {
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
            console.log("Empresa criado com sucesso!");
              localStorage.removeItem("CompanyEmail");
              localStorage.setItem("CompanyEmail", userData.email);
        } else {
            console.error("Erro ao logar", xhr.responseText);
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