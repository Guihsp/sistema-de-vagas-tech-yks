function createinfoCompany(vacancy) {
    const infoCompany = document.createElement('infoCompany');
    infoCompany.className = 'infoCompany';

    infoCompany.innerHTML = `
    <div class="container">

            <div class="info-box">
                <img src="assets/logo-empresa.svg" alt="Imagem da Empresa" class="company-img">
                <div class="infos">
                    <h2 class="user-description">${vacancy.title}</h2>
                    <p class="name-company">${vacancy.companyName}</p>
                    <p class="company-location">${vacancy.location}</p>
                </div>
            </div>

            <a href="#" class="btn-candidatar" onclick="companyPage()">Ver perfil da empresa</a>

        </div>
    `;

    return infoCompany;
}

const companyPage = async () => {
    window.location.href = './companyProfile.html'
}