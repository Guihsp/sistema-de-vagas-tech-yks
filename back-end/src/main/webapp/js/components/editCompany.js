
function createinfoCompany() {
    const infoCompany = document.createElement('infoCompany');
    infoCompany.className = 'infoCompany';

    infoCompany.innerHTML = `
    <div class="container">

            <div class="info-box">
                <img src="assets/logo-empresa.svg" alt="Imagem da Empresa" class="company-img">
                <div class="infos">
                    <h2 class="user-description">DESENVOLVEDOR(A) FRONT-END - JUNIOR</h2>
                    <p class="name-company">CodeCrafters Inc</p>
                    <p class="company-location">São Paulo - SP</p>
                </div>
            </div>

            <a href="#" class="btn-candidatar">Candidate-se</a>

        </div>
    `;

    return infoCompany;
}

const infoCompanyElement = createinfoCompany();
document.getElementById('infoCompany').appendChild(infoCompanyElement);