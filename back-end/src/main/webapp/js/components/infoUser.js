function createCandidateDescriptionContact(candidate) {
    const container = document.querySelector('.container')

    const descriptionContact = document.createElement('div');
    descriptionContact.className = 'candidate-description-contact';

    descriptionContact.innerHTML = `
        <h1>Descrição</h1>
        <p id="description">
            ${candidate.information}
        </p>

        <h2>Contato</h2>
        <p class="contact">
            <strong>Email:</strong>
            <span id="email">${candidate.email}</span>
        </p>
    `;

    container.appendChild(descriptionContact);
    return container;
}

const getCandidateById = async () => {
    let candidateId;

    if (localStorage.getItem('userId')) {
        candidateId = localStorage.getItem('userId');
    } else if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        candidateId = user.id;
    } else {
        console.error("Usuário não encontrado.");
        return;
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `http://localhost:8080/api/getUserById/${candidateId}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const candidate = JSON.parse(xhr.responseText);
                return resolve(candidate);
            } else {
                console.error("Erro ao buscar candidato:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar candidato.");
        };

        xhr.send();
    });
}

const application = async () => {
    const candidate = await getCandidateById();
    createCandidateDescriptionContact(candidate);

    if (!localStorage.getItem('company')) {
        const header = document.createElement('script');
        header.src = './js/components/headerCandidate.js';
        document.body.appendChild(header);
        const infoUser = document.createElement('script');
        infoUser.src = './js/components/candidateInfo.js';
        document.body.appendChild(infoUser);
    } else {
        const header = document.createElement('script');
        header.src = './js/components/headerCompany.js';
        document.body.appendChild(header);
        const infoUser = document.createElement('script');
        infoUser.src = './js/components/candidateInfoToCompany.js';
        document.body.appendChild(infoUser);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(candidate));
    }
}

application();