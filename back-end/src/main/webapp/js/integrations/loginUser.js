function userLogin() {
    const userData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    console.log(userData);
    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/userLogin";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const user = xhr.responseText;
            localStorage.removeItem("user");
            localStorage.setItem("user", user);
            window.location.href = "./edcandidato.html";
        } else {
            console.error("Erro ao fazer login:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}