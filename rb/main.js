let menuBtn = document.querySelectorAll('.nav-item a')

    menuBtn.forEach((li) => {
        li.addEventListener("click", (e) => {
            menuBtn.forEach((el) => el.classList.remove("active"));
            li.classList.add("active");
        });
    });


//jQuery(function(){
  //  $("#txt_name").keypress(function() {
    //    var value = $("#txt_name").val(); 
      //  $("#myDiv").text(value);
    //});
//});



const toggleButton = document.getElementsByClassName('bx-menu')[0]
const navbarLinks = document.getElementsByClassName('navbar-nav')[0]

toggleButton.addEventListener('click', ()=>{
    navbarLinks.classList.toggle("act")
})

window.addEventListener('click', e=>{
    if(navbarLinks.classList.contains('act')
        && e.target != navbarLinks && e.target != toggleButton ){
            navbarLinks.classList.toggle("act")
    }
})
