function createJobCards(vacancies) {
    const vagasContent = document.querySelector('.vagas-content');

    const numVancancyHTML = `
            <div class="num-vancancy">
                <p>Número de vagas abertas: </p>
                <span class="num-vagas">${vacancies.length}</span>
            </div>
        `;
    vagasContent.innerHTML = numVancancyHTML;

    let index = 0;
    vacancies.forEach(job => {
        const card = `
            <div class="card" onclick="redirectToVacancyPage(${index})">
            <a onclick="redirectToVacancyPage(${index})">
                        <img src="./assets/logo-empresa.svg" alt="" class="logo-empresa">
                    </a>
                    <div class="vaga-infos">
                    <a onclick="redirectToVacancyPage(${index})">${job.title}</a>
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

        index++;
    });

    const numVagasElement = document.querySelector('.num-vagas');
    numVagasElement.textContent = vacancies.length;
}

const getCurrentPage = () => {
    const currentPage = window.location.pathname;
    return currentPage;
};

const vacancysIndexPage = async () => {
    const company = JSON.parse(localStorage.getItem("company"));
    
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let url;
        
        if (getCurrentPage() === "/") {
            url = `http://localhost:8080/api/find3LastVacancy`;
        } else if (getCurrentPage() === "/vacanciesPage.html") {
            url = `http://localhost:8080/api/findAllVacancies`;
        } else if (getCurrentPage() === "/pagina_vagas_abertas.html") {
            url = `http://localhost:8080/api/getVacanciesByCompanyId/${company.id}`;
        } else {
            reject("Página não reconhecida.");
            return;
        }
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onload = function () {
            if (xhr.status === 200) {
                const vacancies = JSON.parse(xhr.responseText);
                vagasAbertas = vacancies.length;
                createJobCards(vacancies);
                localStorage.removeItem("vacancies");
                localStorage.setItem("vacancies", JSON.stringify(vacancies));
                resolve(vacancies);
            } else {
                console.error("Erro ao buscar vagas:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar vagas.");
        };

        xhr.send();
    });
};

const redirectToVacancyPage = (indexVacancy) => {
    const vacancies = JSON.parse(localStorage.getItem("vacancies"));
    localStorage.removeItem("vacancyId");
    localStorage.setItem("vacancyId", vacancies[indexVacancy].id);
    localStorage.setItem("vacancy", JSON.stringify(vacancies[indexVacancy]));
    window.location.href = "candidateList.html";
}

vacancysIndexPage();
