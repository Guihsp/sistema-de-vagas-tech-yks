function createDescription(vacancy) {
    const description = document.createElement('div');
    description.className = 'description';

    description.innerHTML = `
    <div class="container">
    <div class="description">
        <h1>Descrição</h1>
        <p>${vacancy.description}</p>
    </div>

    <div class="requirements">
        <h1>Requisitos</h1>
            <p>${vacancy.requeriments}</p>
    </div>

    <div class="salary">
        <h1>Salário</h1>
        <p>${vacancy.salary}</p>
    </div>

    <a class="btn-candidatar" onclick="candidate()">Candidate-se</a>

</div>
    `;

    return description;
}

function getVacancyById() {
    const vacancyId = localStorage.getItem('vacancyId');

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `http://localhost:8080/api/getVacancyById/${vacancyId}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const vacancy = JSON.parse(xhr.responseText);
                return resolve(vacancy);
            } else {
                console.error("Erro ao buscar vaga:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar vaga.");
        };

        xhr.send();
    });
}

async function createAndAppendDescription() {
    try {
        const vacancy = await getVacancyById();
        const infoCompanyElement = createinfoCompany(vacancy);
        document.getElementById('infoCompany').appendChild(infoCompanyElement);
        const descriptionElement = createDescription(vacancy);
        document.getElementById('description').appendChild(descriptionElement);
        if (localStorage.getItem('user')) {
            const script = document.createElement('script')
            script.src = 'js/components/headerCandidate.js'
            document.body.appendChild(script)
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'css/components/headerLogin.css'
            document.head.appendChild(link)
        } else if (localStorage.getItem('company')) {
            window.location.href = './candidateList.html'
        } else {
            const script = document.createElement('script')
            script.src = 'js/components/header.js'
            document.body.appendChild(script)
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'css/components/header.css'
            document.head.appendChild(link)
        }
    } catch (error) {
        console.error("Erro ao buscar vaga:", error);
    }
}

function candidate() {
    if (localStorage.getItem('user')) {
        const vacancy_id = localStorage.getItem('vacancyId');
        const user_id = JSON.parse(localStorage.getItem('user')).id;

        const body = {
            vacancy_id,
            user_id
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = `http://localhost:8080//api/applyVacancy`;

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve();
                    window.location.href = './vagas_candidatadas.html'
                } else {
                    console.error("Erro ao candidatar-se:", xhr.responseText);
                    reject(xhr.responseText);
                }
            };

            xhr.onerror = function () {
                reject("Erro de rede ao candidatar-se.");
            };

            xhr.send(JSON.stringify(body));
        });
    } else {
        window.location.href = './login.html'
    }
}

createAndAppendDescription();