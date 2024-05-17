function createInfoCompanyComponent() {
    const companyInfo = localStorage.getItem("company");
    const parsedInfoCompany = JSON.parse(companyInfo);

    const location = parsedInfoCompany.location ? parsedInfoCompany.location : "Localização não informada";
    const userProfile =  document.createElement('div');
    userProfile.classList.add('user-infos');

    userProfile.innerHTML =`
        <div class="container">
            <div class="user-infos">
                <div class="user-img">
                    <img src="./assets/logo-empresa.svg" alt="Foto de perfil">
                </div>
                
                <div class="user-data">
                    <p id="user-name">${parsedInfoCompany.name}</p>
                    <img src="./assets/Location.svg" alt="Localização">
                    <span id="user-location">${location}</span>
                </div>
            </div>
        </div>
    `;

    return userProfile;
}

const userProfileComponent = createInfoCompanyComponent();
document.querySelector('.section-user-infos').appendChild(userProfileComponent);