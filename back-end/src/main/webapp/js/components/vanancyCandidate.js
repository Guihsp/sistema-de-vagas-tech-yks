
function createvanancyCandidate() {
    const vanancyCandidate = document.createElement('vanancyCandidate');
    vanancyCandidate.className = 'vanancyCandidate';

    vanancyCandidate.innerHTML = `
    <div class="container">
        <h1>Vagas candidatadas</h1>

        <p>Número de vagas candidatadas:
            <span class="numeroDeVagas">0</span>
        </p>

        <div class="vagas-content"></div>

    </div>
    `;

    return vanancyCandidate;
}

const vanancyCandidateElement = createvanancyCandidate();
document.getElementById('vanancyCandidate').appendChild(vanancyCandidateElement);
