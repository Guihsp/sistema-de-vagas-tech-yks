const head=document.head
const body=document.body

const estilo="<link rel='stylesheet' href='./css/footer.css'>"
head.innerHTML+=estilo

const rodape = document.createElement("div")
rodape.setAttribute("class","inicioFooter")
body.prepend(rodape)



const emp = 
"<div class='empresaFooter'>"+
"<h3>Tech YKS</h3>"+
"</div>"
rodape.innerHTML+=emp


const  desc =
"<div class='descFooter'>"+
"<p>Tech Yks © 2024 - Todos os direitos reservados</p>"+
"</div>"
rodape.innerHTML+=desc

const logo=
"<div class='icons'>"+
"<img class='iconFilho' src='./assets/acebook.png' title='Facebook'/>"+
"<img class='iconFilho' src='./assets/instagram.png' title='Instagram'/>"+
"<img class='iconFilho' src='./assets/linkedin.png' title='Linkedin'/>"+
"</div>"
rodape.innerHTML+=logo