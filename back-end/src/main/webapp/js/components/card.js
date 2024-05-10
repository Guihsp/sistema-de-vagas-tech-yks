const jobVacancies = [
    {
        title: "DESENVOLVEDOR(A) FRONT-END - PLENO",
        company: "Canes",
        location: "São Paulo",
        salary: "Até R$7.000"
    },
    {
        title: "DESENVOLVEDOR(A) FULL-STACK - PLENO",
        company: "TechMnds",
        location: "São Paulo",
        salary: "Até R$7.000"
    },
    {
        title: "DESENVOLVEDOR(A) BACK-END - JUNIOR",
        company: "ByteBuilders",
        location: "São Paulo",
        salary: "Até R$4.000"
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
                        <p>${job.company}</p>

                    </div>
                </div>
            </div>
        `;

        vagasContent.insertAdjacentHTML('beforeend', card);
    });
}



createJobCards();
