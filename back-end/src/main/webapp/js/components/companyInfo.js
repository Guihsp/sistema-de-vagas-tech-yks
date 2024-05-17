function createInfoCompanyComponent() {
    const userProfile =  document.createElement('div');
    userProfile.classList.add('user-infos');

    userProfile.innerHTML =`
        <div class="container">
            <div class="user-infos">
                <div class="user-img">
                    <img src="./assets/logo-empresa.svg" alt="Foto de perfil">
                </div>
                
                <div class="user-data">
                    <p id="user-name">Canes</p>
                    <img src="./assets/Location.svg" alt="Localização">
                    <span id="user-location">São Paulo - SP</span>
                </div>
            </div>

            <div class="box-btn">
                <a href="" class="btn">Editar Perfil</a>
                <a href="" class="btn">Ver Vagas</a>
            </div>
        </div>
    `;

    return userProfile;
}

const userProfileComponent = createInfoCompanyComponent();
document.querySelector('.section-user-infos').appendChild(userProfileComponent);