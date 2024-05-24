function createForm() {
    const infoCompany = localStorage.getItem("company");
    const parsedInfoCompany = JSON.parse(infoCompany);
    const form = document.createElement('form');
    form.className = 'form';
    form.innerHTML = `
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

    <button type="button" class="edit-btn" id="saveButton">Salvar</button>
    `;

    if (parsedInfoCompany) {
        form.querySelector('#companyName').value = parsedInfoCompany.name || "";
        form.querySelector('#companyCnpj').value = parsedInfoCompany.cnpj || "";
        form.querySelector('#companyEmail').value = parsedInfoCompany.email || "";
        form.querySelector('#companyAddress').value = parsedInfoCompany.location || "";
        form.querySelector('#companyDescription').value = parsedInfoCompany.description || "";
    }

    return form;
}

const formElement = createForm();
document.querySelector('.edit-form').appendChild(formElement);

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
            const company = xhr.responseText;
            console.log(company);
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
        } else {
            console.error("Erro ao atualizar empresa:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };
    
    xhr.send(jsonData);
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#saveButton').addEventListener('click', (event) => {
        event.preventDefault();
        updateCompany();
    });
});
