
function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="container">
            <nav>   
                <img src="./assets/logo.svg" alt="logo">

                <ul class="nav-list">
                    <li><a href="#" class="nav-link">Ver Vagas</a></li>
                    <li><a href="./login_empresa.html" class="nav-link">Para Empresas</a></li>
                    <li><a href="./login.html" class="nav-link btn-entrar">Entrar</a></li>
                    <li><a href="./candidato.html" class="nav-link btn-cadastrar">Cadastre-se</a></li>
                </ul>

            </nav>
        </div>
    `;

    return header;
}

const headerElement = createHeader();
document.querySelector('header').appendChild(headerElement);
