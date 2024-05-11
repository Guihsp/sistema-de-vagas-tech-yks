const jobVacancies = [
    {
        title: "DESENVOLVEDOR(A) BACK-END - SENIOR",
        company: "Canes",
        location: "São Paulo - SP",
        salary: "Até R$15.000"
    },
    {
        title: "DESENVOLVEDOR(A) FRONT-END - PLENO",
        company: "Canes",
        location: "São Paulo - SP",
        salary: "Até R$7.000"
    },
    {
        title: "DESENVOLVEDOR(A) FULL-STACK - SENIOR",
        company: "Canes",
        location: "São Paulo - SP",
        salary: "Até R$20.000"
    },
    {
        title: "DESENVOLVEDOR(A) MOBILE",
        company: "Canes",
        location: "São Paulo - SP",
        salary: "Até R$6.500"
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
                    <img src="./assets/briefcase.svg" alt="">
                    <p>${job.company}</p>
                        <img src="./assets/location.svg" alt="">
                        <p>${job.location}</p>

                        <img src="./assets/cash.svg" alt="">
                        <p>${job.salary}</p>

                    </div>
                </div>
            </div>
        `;

        vagasContent.insertAdjacentHTML('beforeend', card);
    });
}



createJobCards();
