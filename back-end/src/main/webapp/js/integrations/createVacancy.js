const createVacancy = () => {
    const body = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        salary: document.getElementById("salary").value,
        requeriments: document.getElementById("requeriments").value,
        location: document.getElementById("location").value,
        companyId: JSON.parse(localStorage.getItem("company")).id
    }

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8080/api/createVacancy";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            window.location.href = "./pagina_vagas_abertas.html";
        } else {
            console.error("Erro ao criar vaga:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(JSON.stringify(body));
}