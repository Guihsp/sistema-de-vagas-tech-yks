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
            localStorage.removeItem("CompanyEmail");
            localStorage.setItem("CompanyEmail", userData.email);
            getCompanyByEmail();
        } else {
            console.error("Erro ao criar empresa:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}

const getCompanyByEmail = async () => {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const email = localStorage.getItem("CompanyEmail");
        const url = `http://localhost:8080/api/findCompanyByEmail/${email}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const company = JSON.parse(xhr.responseText);
                localStorage.removeItem("user");
                localStorage.removeItem("company");
                localStorage.setItem("company", JSON.stringify(company));
                window.location.href = "./editCompany.html";
                resolve(company);
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
    createCompany();
});