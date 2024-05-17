
function createinfoUser() {
    const info = localStorage.getItem("user");
    const parsedInfoUser = JSON.parse(info);
    const infoUser = document.createElement('infoUser');
    infoUser.className = 'infoUser';

    infoUser.innerHTML = `
    <div class="container">
        <div class="info-box">
            <img src="assets/profile.svg" alt="Imagem de Perfil" class="user-img">
            <div class="infos">
                <h2 class="user-name">${parsedInfoUser.name}</h2>
                <p class="user-location">
                    <img src="./assets/Location.svg" alt="Localização">
                    <span class="location">${parsedInfoUser.location}</span>
                </p>
            </div>
        </div>
        <a href="./vagas_candidatadas.html" class="btn-user-vagas">Minhas Vagas</a>
    </div>
    `;

    return infoUser;
}

const infoUserElement = createinfoUser();
document.getElementById('infoUser').appendChild(infoUserElement);
