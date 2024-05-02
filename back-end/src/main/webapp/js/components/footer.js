function createFooter() { 
    const footer = document.createElement('footer'); 
    footer.innerHTML = 
    `
    <div class="container"> 
        <img src="./assets/logo-white.svg" alt="logo">
    
        <p>Tech YKS &copy 2024 - Todos os direitos reservados</p> 
    
        <div class="social-media"> 
            <img src="./assets/facebook.svg" alt="facebook">
            <img src="./assets/instagram.svg" alt="instagram">
            <img src="./assets/linkedin.svg" alt="linkedin">
        </div> 
    </div>
    `

    return footer; 
}

    const footerElement = createFooter(); document.querySelector('footer').appendChild(footerElement);