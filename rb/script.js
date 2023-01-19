

let moon = document.getElementById('moon');
        let silueta = document.getElementById('silueta');
        

        window.addEventListener('scroll', function(){
            var value = window.scrollY;

            
            moon.style.top = value * 0.05 + 'px';
            moon.style.left = value * 0.15 + 'px';
            silueta.style.top = value * 0.05 + 'px';
            
        })
        
       

const form = document.querySelector('form')
let variable = [];
let valor = "";
let asdf
let myArray = [];
let text3 = "";
let nombreSinEspacios = "";
let valorFirstLetter = "";

let valorTextoFinal = "";

form.addEventListener('submit', (e)=>{
    let bandera = 0;
    e.preventDefault(); //NO DEJO QUE SE RECARGUE LA PÁGINA AL DARLE AL BOTÓN BUSCAR
    
    const valor = document.getElementById('name').value; //GUARDO EL TEXTO INGRESADO EN EL INPUT EN UNA VARIABLE
    console.log(valor)
    let valorLowerCase = valor.toLowerCase(); //PASO EL TEXTO A MINUSCULA
    
    function containsWhitespace(str) {
        return /\s/.test(str);
      }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1); 
    } 

    let contador2 = 0;
    let arr2 = []


    if (containsWhitespace(valorLowerCase) === true){ //VERIFICO SI INGRESO UN PERSONAJE QUE TIENE ESPACIO, POR EJEMPLO "MISS FORTUNE"
        myArray = valorLowerCase.split(" ");
        myArray.forEach(element =>{
            arr2.push(capitalizeFirstLetter(myArray[contador2])) //HAGO QUE LA PRIMERA LETRA DE CADA PALABRA ESTÉ EN MAYUSCULA Y LO GUARDO EN ARRAY
            contador2++;
        })
        let text2 = arr2.toString(); //PASO EL ARRAY A STRING
        text3 = text2.replace(","," ") //REEMPLAZO LA "," POR UN ESPACIO PARA PODER BUSCAR EL NOMBRE EN LA API
        nombreSinEspacios = valorLowerCase.replace(" ","") //HAGO QUE EL TEXTO NO TENGA ESPACIOS NI MAYUSCULAS PARA BUSCAR LA IMAGEN DEL PERSONAJE
        console.log(text3)
        console.log(nombreSinEspacios)
    }else{
        valorFirstLetter = capitalizeFirstLetter(valorLowerCase); //HAGO QUE LA PRIMERA LETRA SEA EN MAYÚSCULA
        console.log(valorFirstLetter);
        bandera = 1; //USO ESTA VARIABLE PARA VER CUAL VARIABLE USAR EN LA FUNCION FILTER
    }
   
    document.getElementById('name').value='' ; //BORRO EL TEXTO INGRESADO EN EL INPUT

    fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/en_gb/v1/champion-summary.json")
    .then( lista => lista.json())                       
    .then( personaje => 
        {                                               
            let contador = 0; //CREO UNA VARIABLE CONTADOR
            

            if(bandera === 1){
                asdf = personaje.filter( record => record.name === valorFirstLetter); // BUSCO SI EXISTE EL TEXTO INGRESADO EN EL INPUT EN LA API Y LO GUARDO COMO ARRAY     
                valorTextoFinal = valorLowerCase; //ESTA VARIABLE ES LA QUE SIRVE PARA BUSCAR LA IMAGEN
            }else{        
                asdf = personaje.filter( record => record.name === text3); // BUSCO SI EXISTE EL TEXTO INGRESADO EN EL INPUT EN LA API Y LO GUARDO COMO ARRAY     
                valorTextoFinal = nombreSinEspacios; //ESTA VARIABLE ES LA QUE SIRVE PARA BUSCAR LA IMAGEN
            }
            
            
            let arrPrueba = []; //CREO UN ARRAY PARA GUARDAR LOS ROLES DE LOS PERSONAJES

            asdf.forEach(element => {
                arrPrueba.push(asdf[contador].roles) //GUARDO LOS ROLES EN UN ARRAY
                contador++; //USO EL CONTADOR PARA SABER CUANTOS ROLES TIENE EL PERSONAJE
            });

            let strArr = arrPrueba.toString() //PASO EL ARRAY A STRING PARA PODER PONERLOS EN EL HTML
            //console.log(strArr)

            if(contador === 0){ //SI EL CONTADOR ES IGUAL A 0 QUIERE DECIR QUE EL ARRAY ESTÁ VACÍO, POR LO TANTO NO SE ENCONTRÓ EL TEXTO INGRESADO EN EL INPUT EN LA API
                document.getElementById('imageBox').src = "img/signo.png";
                document.getElementById('name-champ').innerHTML = "No encontrado";
                document.getElementById('role-champ').innerHTML='';
            }
            else{
                //EN EL API HAY 2 TIPOS DE LINKS {nombrePersonaje}_circle.png Y {nombrePersonaje}_circle_0.png 
                //POR LO QUE TENGO QUE VERIFICAR CUAL TENGO QUE USAR PARA EL PERSONAJE QUE QUIERO 
                //BÁSICAMENTE PRUEBO LA PRIMERA OPCIÓN {nombrePersonaje}_circle.png Y VERIFICO SI EXISTE LA URL
                //SI EXISTE EL PROGRAMA SIGUE NORMAL
                //SI NO EXISTE PRUEBO CON {nombrePersonaje}_circle_0.png 
                var url = `https://raw.communitydragon.org/latest/game/assets/characters/${valorTextoFinal}/hud/${valorTextoFinal}_circle.png`;
                function UrlExists(url) {
                    var http = new XMLHttpRequest();
                    http.open('HEAD', url, false);
                    http.send();
                    if (http.status != 404)
                        document.getElementById('imageBox').src = 'https://raw.communitydragon.org/latest/game/assets/characters/' + valorTextoFinal + '/hud/' + valorTextoFinal + '_circle.png';
                    else
                        console.log("false");
                }
                try{
                    UrlExists(url)
                }
                catch{
                    document.getElementById('imageBox').src = 'https://raw.communitydragon.org/latest/game/assets/characters/' + valorTextoFinal + '/hud/' + valorTextoFinal + '_circle_0.png';
                }

                if(bandera === 1){
                    document.getElementById('name-champ').innerHTML = "Campeón: "+valorFirstLetter; 
                }else{
                    document.getElementById('name-champ').innerHTML = "Campeón: "+text3;
                }
                document.getElementById('role-champ').innerHTML = "Rol: "+strArr;
                }
        })
    .catch(err=>console.log(err))


    
})





