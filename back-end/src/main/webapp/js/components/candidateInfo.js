function createInfoUserComponent() {
    const infoUser = localStorage.getItem("user");
    const parsedInfoUser = JSON.parse(infoUser);
    const userProfile = `
        <div class="container">
            <div class="user-infos">
                <div class="user-img">
                    <img src="./assets/profile.svg" alt="Foto de perfil">
                </div>
                
                <div class="user-data">
                    <p id="user-name">${parsedInfoUser.name}</p>
                    <img src="./assets/Location.svg" alt="Localização">
                    <span id="user-location">${parsedInfoUser.location}</span>
                </div>
            </div>

            <div class="box-btn">
                <a href="" class="btn">Editar Perfil</a>
                <a href="" class="btn">Minhas Vagas</a>
            </div>
        </div>
    `;

    return userProfile;
}

const userProfileComponent = createInfoUserComponent();
document.querySelector('.section-user-infos').innerHTML = userProfileComponent;