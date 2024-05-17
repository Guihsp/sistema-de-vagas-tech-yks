
function createinfoCompany() {
    const companyInfo = localStorage.getItem("company");
    const parsedInfoCompany = JSON.parse(companyInfo);

    const infoCompany = document.createElement('infoCompany');
    infoCompany.className = 'infoCompany';

    infoCompany.innerHTML = `
    <div class="container">
                <div class="info-box">
                    <img src="assets/logo-empresa.svg" alt="Imagem de Perfil da Empresa">

                    <div class="infos">
                        <p class="company-name">${parsedInfoCompany.name}</p>

                        <ul>
                            <li>
                                <img src="assets/Location.svg" alt="Localização">
                                <span class="location-company">${parsedInfoCompany.location}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="box-btn">
                    <a href="./editCompany.html" class="btn-editar">Editar Perfil</a>
                </div>

            </div>
    `;

    return infoCompany;
}

const infoCompanyElement = createinfoCompany();
document.getElementById('infoCompany').appendChild(infoCompanyElement);
