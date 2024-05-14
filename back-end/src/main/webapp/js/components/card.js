function createJobCards(vacancies) {
    const vagasContent = document.querySelector('.vagas-content');

    vacancies.forEach(job => {
        const card = `
            <div class="card">
                <a href="#">
                    <img src="./assets/logo-empresa.svg" alt="" class="logo-empresa">
                </a>
                <div class="vaga-infos">
                    <a href="#">${job.title}</a>

                    <div class="row">
                        <img src="./assets/location.svg" alt="">
                        <p>${job.location}</p>

                        <img src="./assets/cash.svg" alt="">
                        <p>${job.salary}</p>

                        <img src="./assets/briefcase.svg" alt="">
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
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let url;

        if (getCurrentPage() === "/") {
            url = `http://localhost:8080/api/find3LastVacancy`;
        } else if (getCurrentPage() === "/vacanciesPage.html") {
            url = `http://localhost:8080/api/findAllVacancies`;
        }else if(getCurrentPage() === "/pagina_vagas_abertas.html"){
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

vacancysIndexPage();
