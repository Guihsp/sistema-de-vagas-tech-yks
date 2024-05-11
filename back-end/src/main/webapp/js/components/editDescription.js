
function createDescription() {
    const description = document.createElement('description');
    description.className = 'description';

    description.innerHTML = `
    <div class="container">
    <div class="description">
        <h1>Descrição</h1>
        <p>Seja parte do nosso time inovador como Desenvolvedor Júnior, onde a paixão pela tecnologia encontra a
            busca constante pela excelência. Como parte essencial da nossa equipe, você terá a oportunidade de
            aprimorar suas habilidades em Python e JavaScript, contribuindo para o desenvolvimento de soluções
            impactantes.</p>
    </div>

    <div class="requirements">
        <h1>Requisitos</h1>
        <ul>
            <li>-Formação em ensino superior ou técnico;</li>
            <li>-Inglês Intermediário;</li>
            <li>-Experiência com ferramentas de versionamento de código (GIT,...);</li>
            <li>-Conhecimento em metodologias ágeis (Scrum/Kanban);</li>
            <li>-Noções básicas de API</li>
            <li>-Diferenciais</li>
            <li>-Experiencia com ReactJs</li>
            <li>-Conhecimento de aprendizado de máquina e suas ferramentas, tais como Scikit-learn e PyTorch.
            </li>
            <li>-Conhecimento básico em ferramentas de LLM tais como ChatGPT, Llama, outro.</li>
        </ul>
    </div>

    <div class="salary">
        <h1>Salário</h1>
        <p>Até R$ 3.500</p>
    </div>

    <a href="#" class="btn-candidatar">Candidate-se</a>

</div>
    `;

    return description;
}

const descriptionElement = createDescription();
document.getElementById('description').appendChild(descriptionElement);