function createUser() {
    const userData = {
        name: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
    };
    password = document.getElementById("senha").value
    confirmPassword = document.getElementById("confirmar-senha").value
    if (password != confirmPassword) {
        alert("Senhas não conferem")
        return
    }

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/createUser";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Usuário criado com sucesso!");
            localStorage.removeItem("UserEmail");
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
                const pessoa = JSON.parse(xhr.responseText);
                localStorage.removeItem("user");
                localStorage.removeItem("company");
                localStorage.setItem("user", JSON.stringify(pessoa));
                window.location.href = "./candidateProfile.html";
                resolve(pessoa);
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