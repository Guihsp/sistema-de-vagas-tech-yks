const jobVacancies = [
    {
        title: "DESENVOLVEDOR(A) FRONT-END - PLENO",
        company: "Canes",
        location: "São Paulo",
        salary: "Até R$7.000"
    },
    {
        title: "DESENVOLVEDOR(A) FULL-STACK - PLENO",
        company: "TechMnds Solutions",
        location: "São Paulo",
        salary: "Até R$7.000"
    },
    {
        title: "DESENVOLVEDOR(A) BACK-END - JUNIOR",
        company: "ByteBuilders",
        location: "São Paulo",
        salary: "Até R$4.000"
    }
];

function createJobCards() {
    const vagasContent = document.querySelector('.vagas-content');

    jobVacancies.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('card');

        const logoLink = document.createElement('a');
        logoLink.href = '#';

        const logoImage = document.createElement('img');
        logoImage.src = "./assets/logo-empresa.svg";
        logoImage.alt = "";
        logoImage.classList.add('logo-empresa');

        logoLink.appendChild(logoImage);

        const jobLink = document.createElement('a');
        jobLink.href = '#';
        jobLink.textContent = job.title;

        const vagaInfos = document.createElement('div');
        vagaInfos.classList.add('vaga-infos');

        const companyRow = createRowElement("./assets/briefcase.svg", job.company);
        const locationRow = createRowElement("./assets/Location.svg", job.location);
        const salaryRow = createRowElement("./assets/cash.svg", job.salary);

        vagaInfos.appendChild(companyRow);
        vagaInfos.appendChild(locationRow);
        vagaInfos.appendChild(salaryRow);

        card.appendChild(logoLink);
        card.appendChild(jobLink);
        card.appendChild(vagaInfos);

        vagasContent.appendChild(card);
    });
}

function createRowElement(iconSrc, text) {
    const row = document.createElement('div');
    row.classList.add('row');

    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.alt = "";

    const textElement = document.createElement('p');
    textElement.textContent = text;

    row.appendChild(icon);
    row.appendChild(textElement);

    return row;
}

createJobCards();
