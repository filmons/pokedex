
let allTitre = document.querySelector(".poke-name");
let allNamer = document.querySelector(".poke-id");
let frontImage = document.querySelector(".poke-front-image");
let backImage = document.querySelector(".poke-back-image");
let gras = document.querySelector(".poke-type-one");
let poison = document.querySelector(".poke-type-two");
let myWeight = document.querySelector(".poke-weight");
let myHeight = document.querySelector(".poke-height");
let blackboard = document.querySelector(".main-screen");
// scopes globale pour accer par tout
let rightContainer = document.querySelector(".right-container__screen");
let list = document.querySelectorAll(".list-item");
let prev = document.querySelector(".left-button");
let next = document.querySelector(".right-button");
let flecheHaut = document.querySelector('d-pad__cell top');
// scopes globale pour accer par tout
// 3 var declaré au pres alable pour utliser au addEventelisner
var listSuivante;
var listprecedente = null;
var url;

function tellMe (url){ // ctte function pour afiche les nom de api à droite
fetch(url)
.then( response=>response.json())
.then(data=>{

   listSuivante = data.previous; // le var declare au pers alable 
   listprecedente = data.next

       var result = data.results;
      //   console.log(data.previous);
      //   console.log(data.next);
        for (let i = 0; i < list.length; i++ ){

         var myResult = result[i];
         var listP = list[i];
         var names = myResult.name;
         var num = myResult.url;
         var numBes = num.split("pokemon/")[1].split("/")[0] // maitod pour couper le url et touver le  id
         // console.log(numBes);
         

        
        listP.textContent = `${numBes}. ${names}`;  // pour afiche nles nome et le numero
      
     }
    });

   }
   let urlApi ="https://pokeapi.co/api/v2/pokemon/"
   list.forEach(element => {
      // cette forEach pour lire en clicant un nom de la liste

      element.addEventListener("click",()=> {
         urlApi = "https://pokeapi.co/api/v2/pokemon/" + element.textContent.match(/\d+/)//match une metod charcher DMN 
         fetch(urlApi).then(response => response.json()).then(data =>{ 

         blackboard.classList.remove('hide'); // remove maitode our des voiler le couler noire    
         gras.textContent = data.types[0].type.name;
               if(data.types.length == 2){
                  poison.classList.remove('hide');
                  poison.textContent = data.types[1].type.name;
               }
               else {
                   poison.classList.add('hide');
               }
               let chiffre = `${data.id}`
               if(chiffre.length == 1){
                  allNamer.textContent = '# 00' + data.id;
                  console.log(allNamer);
               } 
               else if(chiffre.length == 2){
                  allNamer.textContent = '# 0' + data.id;
               }
                  else 
               allNamer.textContent = '#  ' + data.id;
               allTitre.textContent = data.name;
               blackboard.setAttribute('class', 'main-screen ' + data.types[0].type.name);
                backImage.src = data.sprites.back_default;
                frontImage.src = data.sprites.front_default;
               myWeight.textContent = data.weight;
               myHeight.textContent = data.height;    
           
               
         })
      })
   });   


// les duex eventListner pour avancer et revenir areir
   prev.addEventListener("click", function (){if(listSuivante)tellMe(listSuivante)});

   next.addEventListener("click", function(){if(listprecedente)tellMe(listprecedente)});

 tellMe("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20/id");
