/*
Tämä luokka on pelilogiikan keskus. Moottori sitoo muut osat yhteen, alustaa kentän ja aloittaa
sekä lopettaa pelisession.
*/
const canvas = document.getElementById("kentta"); //haetaan pohjaksi kenttä, joka alustettiin html tiedostossa
const ctx = canvas.getContext("2d");
let kentta = new Kentta(ctx); //luodaan uusi kenttä

function clear(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //poistaa vanhan instanssin
}
function pelaa() { //Aloittaa pelin. Sidottu "pelaa" -nappiin
  kentta.reset(); //alustetaan kenttä
  //console.log("palikan aloitus pos y", palikka.y)
  console.log(MUODOT)
  
  //luodaan uusi palikka aina kun palikka on laskeutunut
  
 /* if(kentta.palikka.onPohjalla()){
    
  }
  */

  document.addEventListener("keydown", function (event) {
    palikka = kentta.palikka
    //console.log(palikka.tyyppiId)
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "KeyS") { //liiku alaspäin
      clear();
      palikka.liiku("alas");
      
    }
    if (event.code === "KeyA") { //liiku vasemmalle
      clear();
      palikka.liiku("vasemmalle");
    }
    if (event.code === "KeyD") { //liiku oikealle
      clear();
      palikka.liiku("oikealle");
    }
    if (event.code === "KeyW") { //liiku oikealle
      clear();
      palikka.rotate(palikka);
    }
    event.preventDefault();
  }, true);
}





