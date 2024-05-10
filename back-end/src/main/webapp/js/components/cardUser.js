function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `  
        <li class="candidate">
                <img src="./assets/profile.svg" alt="imagem de perfil">
                <span class="candidate-name">Guilherme Henrique</span>
        </li>
    `;

    return card;
}

const cardElement = createCard();

document.querySelector('.candidate-list').appendChild(cardElement);