function createUser() {
    const userData = {
        name: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
    };

    const password = document.getElementById("senha").value;
    const confirmPassword = document.getElementById("confirmar-senha").value;
    
    if (password != confirmPassword) {
        alert("Senhas não conferem");
        return;
    }

    const jsonData = JSON.stringify(userData);
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/createUser";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            localStorage.setItem("UserEmail", userData.email);
            getUserByEmail();
        } else {
            console.error("Erro ao criar usuário:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}

const getUserByEmail = async () => {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const email = localStorage.getItem("UserEmail");
        const url = `http://localhost:8080/api/findUserByEmail/${email}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const user = JSON.parse(xhr.responseText);
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "./edcandidato.html";
                resolve(user);
            } else {
                console.error("Erro ao buscar usuário:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar usuário.");
        };

        await xhr.send();
    });
};

document.getElementById("cadastrarButton").addEventListener("click", function () {
    createUser();
});
