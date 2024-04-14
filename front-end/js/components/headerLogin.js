function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="container">
            <nav>
                <a href="#" class="logo">
                    <img src="./assets/logo.svg" alt="logo">
                </a>

                <div class="nav-list">
                    <a href="#" class="nav-link">
                        <img src="./assets/logo-empresa.svg" alt="user" class="user-img">
                        <span class= "user-name">Canes</span>
                    </a>
                </div>

                <div id="menu" class="menu">
                    <ul class="menu-list">
                        <li><a href="#" class="menu-link">Perfil Candidato</a></li>
                        <li><a href="#" class="menu-link">Minhas Vagas</a></li>
                        <li><a href="#" class="menu-link">Editar Perfil</a></li>
                        <li><a href="#" class="menu-link">Sair</a></li>
                    </ul>
                </div>
                
            </nav>
        </div>
    `;

    return header;
}

const headerElement = createHeader();
document.querySelector('header').appendChild(headerElement);
