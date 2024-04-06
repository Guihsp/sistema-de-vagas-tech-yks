
const head = document.querySelector('head'); 
head.innerHTML += ` <link rel="stylesheet" href="./css/footer.css"> ` 

function createFooter() { 
    const footer = document.createElement('footer'); 
    footer.innerHTML = 
    ` <div class="container"> 
    <a href="#" class="logo"> 
    <img src="./assets/logo-white.svg" alt="logo"> </a>
    
    <p>Tech YKS &copy 2024 - Todos os direitos reservados</p> 
    
        <div class="social-media"> 
            <a href="#"> <img src="./assets/facebook.svg" alt="facebook"> </a> 
            <a href="#"> <img src="./assets/instagram.svg" alt="instagram"> </a> 
            <a href="#"> <img src="./assets/linkedin.svg" alt="linkedin"> </a> 
        </div> 
    </div>`
    
    return footer; } 
    
    const footerElement = createFooter(); document.querySelector('footer').appendChild(footerElement);