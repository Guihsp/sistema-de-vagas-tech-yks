const createForm = () => {
    const infoCompany = localStorage.getItem("company");
    const parsedInfoCompany = JSON.parse(infoCompany);
    const form = `
    <form class="form">
        <div class="form-group">
            <label for="companyName">* Nome da Empresa</label>
            <input type="text" name="companyName" id="companyName" placeholder="Ex: Tech Yks" required>
        </div>

        <div class="form-group">
            <label for="companyCnpj">* CNPJ</label>
            <input type="text" name="companyCnpj" id="companyCnpj" placeholder="Ex: 00.000.000/0000-00" required>
        </div>

        <div class="form-group">
            <label for="companyEmail">* Email</label>
            <input type="email" name="companyEmail" id="companyEmail" placeholder="Ex: techyks@gmail.com" required>
        </div>

        <div class="form-group">
            <label for="companyAddress">* Endereço</label>
            <input type="text" name="companyAddress" id="companyAddress" placeholder="Ex: São Paulo - SP" required>
        </div>


        <div class="form-group">
            <label for="companyDescription">* Descrição da Empresa</label>
            <textarea name="companyDescription" id="companyDescription" cols="30" rows="8" maxlength="950" placeholder="Fale um pouco sobre a empresa" required></textarea>
        </div>

        <button class="edit-btn" onclick="updateCompany()">Salvar</button>
    </form>
    `;

    const foormInHtml = document.querySelector('.edit-form');
    foormInHtml.innerHTML = form;


    if (parsedInfoCompany) {
        document.querySelector('#companyName').value = parsedInfoCompany.name ? parsedInfoCompany.name : "";
        document.querySelector('#companyCnpj').value = parsedInfoCompany.cnpj ? parsedInfoCompany.cnpj : "";
        document.querySelector('#companyEmail').value = parsedInfoCompany.email ? parsedInfoCompany.email : "";
        document.querySelector('#companyAddress').value = parsedInfoCompany.location ? parsedInfoCompany.location : "";
        document.querySelector('#companyDescription').value = parsedInfoCompany.description ? parsedInfoCompany.description : "";
    }
    return form;
}

createForm();

const updateCompany = async () => {
    const name = document.querySelector('#companyName').value;
    const cnpj = document.querySelector('#companyCnpj').value;
    const email = document.querySelector('#companyEmail').value;
    const location = document.querySelector('#companyAddress').value;
    const description = document.querySelector('#companyDescription').value;

    let infoCompany = {
        name,
        cnpj,
        email,
        location,
        description,
    }
    const companyLocal = localStorage.getItem("company");
    const parsedInfoCompany = JSON.parse(companyLocal);

    const jsonData = JSON.stringify(infoCompany);

    const xhr = new XMLHttpRequest();
    const url = `http://localhost:8080/api/updateCompany/${parsedInfoCompany.id}`;

    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Empresa atualizada com sucesso!");
            infoCompany = {
                id: parsedInfoCompany.id,
                name,
                cnpj,
                email,
                location,
                description,
            }
            localStorage.removeItem("company");
            localStorage.setItem("company", JSON.stringify(infoCompany));

            window.location.href = "./editCompany.html";
        }
    }

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    }

    xhr.send(jsonData);
}