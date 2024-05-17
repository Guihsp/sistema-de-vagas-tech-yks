function createForm() {
    const infoUser = localStorage.getItem("user");
    const parsedInfoUser = JSON.parse(infoUser);
    const form = document.createElement('form');
    form.innerHTML = `
    <form action="">
    <label for="name">*Nome:</label>
    <input type="text" id="name" placeholder="Ex: Fulano" required>

    <label for="description">*Descrição</label>
    <textarea name="description" id="description" cols="30" rows="8" placeholder="Ex: Descreva um pouco sobre você" required></textarea>

    <label for="location">*Localização</label>
    <input type="text" id="location" placeholder="Ex: SP - São Paulo" required>

    <label for="email">*Email para contato</label>
    <input type="email" id="email" placeholder="Ex: fulano@gmail.com" required>
</form>
    `;

    if (parsedInfoUser) {
        form.querySelector('#name').value = parsedInfoUser.name ? parsedInfoUser.name : "";
        form.querySelector('#description').value = parsedInfoUser.information ? parsedInfoUser.information : "";
        form.querySelector('#location').value = parsedInfoUser.location ? parsedInfoUser.location : "";
        form.querySelector('#email').value = parsedInfoUser.email ? parsedInfoUser.email : "";
    }

    return form;
}

const formElement = createForm();
document.querySelector('form').appendChild(formElement);

const updateUser = async () => {
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const location = document.querySelector('#location').value;
    const email = document.querySelector('#email').value;

    let infoUser = {
        name,
        email,
        information: description,
        location,
    }
    const userLocal = localStorage.getItem("user");
    const parsedInfoUser = JSON.parse(userLocal);

    const jsonData = JSON.stringify(infoUser);

    const xhr = new XMLHttpRequest();
    const url = `http://localhost:8080/api/updateUser/${parsedInfoUser.id}`;

    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Usuário atualizado com sucesso!");
            infoUser = {
                id: parsedInfoUser.id,
                name,
                email,
                information: description,
                location
            }
            localStorage.setItem("user", JSON.stringify(infoUser));

            window.location.href = "./edcandidato.html";
        } else {
            console.error("Erro ao atualizar usuário:", xhr.responseText);
        }
    };

    xhr.onerror = function () {
        console.error("Erro de conexão.");
    };

    xhr.send(jsonData);
}