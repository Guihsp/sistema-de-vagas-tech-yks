function createJobCards(vacancies) {
    if (getCurrentPage() === "/vagas_candidatadas.html") {
        const vanancyCandidate = document.createElement('vanancyCandidate');
        vanancyCandidate.className = 'vanancyCandidate';

        vanancyCandidate.innerHTML = `
            <div class="container">
            <h1>Vagas candidatadas</h1>

            <p>Número de vagas candidatadas:
            <span class="numeroDeVagas">${vacancies.length}</span>
            </p>

            <div class="vagas-content"></div>

            </div>
            `;
        
        document.getElementById('vanancyCandidate').appendChild(vanancyCandidate);
    }
    const vagasContent = document.querySelector('.vagas-content');

    vacancies.forEach(job => {
        const card = `
            <div class="card" onclick="redirectToVacancyPage(${job.id})">
                <a onclick="redirectToVacancyPage(${job.id})">
                    <img src="./assets/logo-empresa.svg" alt="" class="logo-empresa">
                </a>
                <div class="vaga-infos">
                    <a onclick="redirectToVacancyPage(${job.id})">${job.title}</a>

                    <div class="row">
                        <img src="./assets/Location.svg" alt="Localização">
                        <p>${job.location}</p>

                        <img src="./assets/cash.svg" alt="Salário">
                        <p>${job.salary}</p>

                        <img src="./assets/briefcase.svg" alt="Empresa">
                        <p>${job.companyName}</p>

                    </div>
                </div>
            </div>
        `;

        vagasContent.insertAdjacentHTML('beforeend', card);
    });
}

const getCurrentPage = () => {
    const currentPage = window.location.pathname;
    return currentPage;
};

const vacancysIndexPage = async () => {
    const company = JSON.parse(localStorage.getItem("company"))
    const user = JSON.parse(localStorage.getItem("user"))

    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let url;

        if (getCurrentPage() === "/") {
            url = `http://localhost:8080/api/find3LastVacancy`;
        } else if (getCurrentPage() === "/vacanciesPage.html") {
            url = `http://localhost:8080/api/findAllVacancies`;
        } else if (getCurrentPage() === "/pagina_vagas_abertas.html") {
            url = `http://localhost:8080/api/getVacanciesByCompanyId/${company.id}`;
        } else if (getCurrentPage() === "/vagas_candidatadas.html") {
            url = `http://localhost:8080/api/getVacanciesByUserId/${user.id}`;
        } else {
            reject("Página não reconhecida.");
            return;
        }

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const vacancies = JSON.parse(xhr.responseText);
                createJobCards(vacancies);
                return resolve(vacancies);
            } else {
                console.error("Erro ao buscar vagas:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar vagas.");
        };

        await xhr.send();
    });
};

const redirectToVacancyPage = (vacancyId) => {
    localStorage.setItem("vacancyId", vacancyId);
    window.location.href = "vaga_aberta.html";
}

vacancysIndexPage();
