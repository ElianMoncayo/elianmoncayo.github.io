const bxmenu = document.querySelector('.bx-menu');
const menu = document.querySelector('.menu-navegacion');



bxmenu.addEventListener('click', ()=>{
    menu.classList.toggle("spread")
})

window.addEventListener('click', e=>{
    if(menu.classList.contains('spread')
        && e.target != menu && e.target != bxmenu ){
            menu.classList.toggle("spread")
    }
})