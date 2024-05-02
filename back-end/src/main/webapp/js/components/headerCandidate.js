const getUserByEmail = async () => {
    return new Promise(async (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const email = localStorage.getItem("UserEmail");
        const url = `http://localhost:8080/api/findUserByEmail/${email}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                const pessoa = JSON.parse(xhr.responseText);
                console.log("Usuário encontrado com sucesso!", pessoa);
                localStorage.setItem("user", JSON.stringify(pessoa));
                resolve(pessoa);
            } else {
                console.error("Erro ao buscar usuário:", xhr.responseText);
                reject(xhr.responseText);
            }
        };

        xhr.onerror = function () {
            reject("Erro de rede ao buscar usuário.");
        };

        await xhr.send();
    });
};


function createHeader() {
    const infoUser = localStorage.getItem("user");
    const parsedInfoUser = JSON.parse(infoUser);
    const header = document.createElement('header');
    header.innerHTML = `
    <div class="container">
        <nav>
            <img src="./assets/logo.svg" alt="logo">

            <ul class="nav-list">
                
                <li>
                    <a href="#" class="nav-link btn-perfil">
                        <img src="./assets/profile.svg" alt="">
                        ${parsedInfoUser.name}
                    </a>
                </li>

                <li>
                    <button id="btn-menu">
                        <span id="hamburger"></span>
                    </button>
                </li>

                <li>
                    <ul class="dropdown">
                        <li>
                            <a href="#" class="nav-link">
                                <img src="./assets/profile.svg" alt="">
                                <span>Perfil do Candidato </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link">
                                <img src="./assets/add.svg" alt="adiciona">
                                <span>Editar Perfil</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link">
                                <img src="./assets/list.svg" alt="lista">
                                <span>Minhas Vagas</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link">
                                <img src="./assets/logout.svg" alt="logout">
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>

        </nav>
    </div>
    `;

    return header;
}

const headerElement = createHeader();
document.querySelector('header').appendChild(headerElement);

const btnMenu = () => {
    const btn = document.querySelector('#btn-menu');
    const menu = document.querySelector('.dropdown');

    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

btnMenu();