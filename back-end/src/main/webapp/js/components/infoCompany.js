function createCompanyDescription(company) {
    const container = document.querySelector('.container')

    const descriptionCompany = document.createElement('div');
    descriptionCompany.className = 'description-company';

    descriptionCompany.innerHTML = `
        <h1>Descrição da Empresa</h1>
        <p id="description">
            ${company.description}
        </p>
    `;

    container.appendChild(descriptionCompany);
    return container;
}

const getCompanyById = async () => {
    let companyId;

    if (localStorage.getItem('companyId')) {
        companyId = localStorage.getItem('companyId');
    } else if (localStorage.getItem('company')) {
        const company = JSON.parse(localStorage.getItem('company'));
        companyId = company.id;
    } else {
        console.error("Empresa não encontrado.");
        return;
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `http://localhost:8080/api/getCompanyById/${companyId}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const company = JSON.parse(xhr.responseText);
                return resolve(company);
            } else {
                console.error("Erro ao buscar empresa:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar empresa.");
        };

        xhr.send();
    });
}

const application = async () => {
    const company = await getCompanyById();
    createCompanyDescription(company);
    if (!localStorage.getItem('company')) {
        const header = document.createElement('script');
        header.src = './js/components/headerCandidate.js';
        document.body.appendChild(header);
        const infoUser = document.createElement('script');
        infoUser.src = './js/components/companyInfoToCandidate.js';
        document.body.appendChild(infoUser);
    } else {
        const header = document.createElement('script');
        header.src = './js/components/headerCompany.js';
        document.body.appendChild(header);
        const infoUser = document.createElement('script');
        infoUser.src = './js/components/companyInfo_copy.js';
        document.body.appendChild(infoUser);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(company));
    }
}

application();