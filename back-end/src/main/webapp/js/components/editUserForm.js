
function createForm() {
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

    return form;
}

const formElement = createForm();
document.querySelector('form').appendChild(formElement);
