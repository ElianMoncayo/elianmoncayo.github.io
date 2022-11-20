

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


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const valor = document.getElementById('name').value;
    console.log(valor)
    let valorLowerCase = valor.toLowerCase();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
      let valorFirstLetter = capitalizeFirstLetter(valorLowerCase);
      console.log(valorFirstLetter);
    
    document.getElementById('name').value='' ; 

    fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/es_es/v1/champion-summary.json")
    .then( lista => lista.json())                       
    .then( personaje => 
        {                                               
            let contador = 0;    
            asdf = personaje.filter( record => record.name === valorFirstLetter);         
            
            let arrPrueba = [];

            asdf.forEach(element => {
                arrPrueba.push(asdf[contador].roles)
                contador++;
            });

            let strArr = arrPrueba.toString()
            //console.log(strArr)

            if(contador === 0){
                document.getElementById('imageBox').src = "img/signo.png";
                document.getElementById('name-champ').innerHTML = "No encontrado";
                document.getElementById('role-champ').innerHTML='';
            }
            else{
            
                var url = `https://raw.communitydragon.org/latest/game/assets/characters/${valorLowerCase}/hud/${valorLowerCase}_circle.png`;
                function UrlExists(url) {
                    var http = new XMLHttpRequest();
                    http.open('HEAD', url, false);
                    http.send();
                    if (http.status != 404)
                        document.getElementById('imageBox').src = 'https://raw.communitydragon.org/latest/game/assets/characters/' + valorLowerCase + '/hud/' + valorLowerCase + '_circle.png';
                    else
                        console.log("false");
                }
                try{
                    UrlExists(url)
                }
                catch{
                    document.getElementById('imageBox').src = 'https://raw.communitydragon.org/latest/game/assets/characters/' + valorLowerCase + '/hud/' + valorLowerCase + '_circle_0.png';
                }

                
                document.getElementById('name-champ').innerHTML = "Campeón: "+valorFirstLetter;
                document.getElementById('role-champ').innerHTML = "Rol: "+strArr;
                }
        })
    .catch(err=>console.log(err))


    
})





