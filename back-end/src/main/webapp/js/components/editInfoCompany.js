
function createinfoCompany() {
    const infoCompany = document.createElement('infoCompany');
    infoCompany.className = 'infoCompany';

    infoCompany.innerHTML = `
    <div class="container">
                <div class="info-box">
                    <img src="assets/logo-empresa.svg" alt="Imagem de Perfil da Empresa">

                    <div class="infos">
                        <p class="company-name">Canes</p>

                        <ul>
                            <li>
                                <img src="assets/Location.svg" alt="Localização">
                                <span class="location-company">São Paulo - SP</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="box-btn">
                    <a href="#" class="btn-editar">Editar Perfil</a>
                </div>

            </div>
    `;

    return infoCompany;
}

const infoCompanyElement = createinfoCompany();
document.getElementById('infoCompany').appendChild(infoCompanyElement);
