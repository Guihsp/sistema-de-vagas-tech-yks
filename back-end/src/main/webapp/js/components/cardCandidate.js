function createCard(users) {
    const vacancy = JSON.parse(localStorage.getItem("vacancy"));

    const vancancyInfos = document.createElement('div');
    vancancyInfos.className = 'infos';

    vancancyInfos.innerHTML = `
    <p class="vancancy-name">${vacancy.title}</p>

    <ul>
        <li>
            <img src="./assets/briefcase.svg" alt="Pasta">
            <span class="company-name">${vacancy.companyName}</span>
        </li>
    
        <li>
            <img src="./assets/Location.svg" alt="Localização">
            <span class="location-vancancy">${vacancy.location}</span>
        </li>

        <li>
            <img src="./assets/cash.svg" alt="Dinheiro">
            <span class="salary-vancancy">${vacancy.salary}</span>
        </li>
    </ul>
    `;
    document.querySelector('.info-box').appendChild(vancancyInfos);

    const numberVancancy = document.createElement('div');
    numberVancancy.className = 'num-candidates-vancancy';

    numberVancancy.innerHTML = `
        <p>Número de Candidatos na vaga: </p>
        <span class="num-candidates">${users.length}</span>
    `;

    document.querySelector('.candidate-list').appendChild(numberVancancy);

    const card = document.createElement('div');
    card.classList.add('card');

    for (let i = 0; i < users.length; i++) {
        card.innerHTML = `  
        <li class="candidate" onclick="redirect(${users[i].id})">
                <img src="./assets/profile.svg" alt="imagem de perfil">
                <span class="candidate-name">${users[i].name}</span>
        </li>
    `;
    }
    return card;
}

async function createAndAppendCard(vacancyId) {
    try {
        const users = await fundUsersByVacancy(vacancyId);
        const cardElement = createCard(users);
        document.querySelector('.candidate-list').appendChild(cardElement);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

const redirect = (id) => {
    localStorage.removeItem("userId");
    localStorage.setItem("userId", id);
    window.location.href = "./candidateProfile.html";
}

const fundUsersByVacancy = async (vacancyId) => {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `http://localhost:8080/api/findUsersByVacancy/${vacancyId}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const users = JSON.parse(xhr.responseText);
                resolve(users);
            } else {
                console.error("Erro ao buscar usuários:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.send();
    });
}

const vacancyId = localStorage.getItem("vacancyId");
localStorage.getItem("vacancyId");
createAndAppendCard(vacancyId);
