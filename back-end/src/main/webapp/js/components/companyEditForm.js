const createForm = () => {
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

        <button class="edit-btn">Salvar</button>
    </form>
    `;

    return form;
}

const formElement = createForm();
document.querySelector(`.edit-form`).innerHTML = formElement;