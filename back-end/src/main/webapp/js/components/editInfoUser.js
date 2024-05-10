
function createinfoUser() {
    const infoUser = document.createElement('infoUser');
    infoUser.className = 'infoUser';

    infoUser.innerHTML = `
    <div class="container">
        <div class="info-box">
            <img src="assets/profile.svg" alt="Imagem de Perfil" class="user-img">
            <div class="infos">
                <h2 class="user-name">Vitor Cobeio</h2>
                <p class="user-location">
                    <img src="./assets/Location.svg" alt="Localização">
                    <span class="location">São Paulo - SP</span>
                </p>
            </div>
        </div>
        <a href="#" class="btn-user-vagas">Minhas Vagas</a>
    </div>
    `;

    return infoUser;
}

const infoUserElement = createinfoUser();
document.getElementById('infoUser').appendChild(infoUserElement);
