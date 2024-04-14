const btnMenu = () => {
    const btn = document.querySelector('#btn-menu');
    const menu = document.querySelector('.dropdown');

    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

btnMenu();