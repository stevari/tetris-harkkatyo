/*
Tämä luokka on pelilogiikan keskus. Moottori sitoo muut osat yhteen, alustaa kentän ja aloittaa
sekä lopettaa pelisession.
*/

const canvas = document.getElementById("kentta"); //haetaan pohjaksi kenttä, joka alustettiin html tiedostossa
const ctx = canvas.getContext("2d");
let kentta = new Kentta(ctx); //luodaan uusi kenttä


function pelaa() { //Aloittaa pelin. Sidottu "pelaa" -nappiin
  kentta.reset(); //alustetaan kenttä
  //console.log("palikan aloitus pos y", palikka.y)
  

  document.addEventListener("keydown", function (event) {
    palikka = kentta.palikka
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "KeyS") {
      // alaspäin
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //poistaa vanhan instanssin
      palikka.y++;
      palikka.piirraPalikka();
      console.log("palikan päivitetty pos y", palikka.y)

    }
    if (event.code === "KeyA") {
      // vensteriin
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      palikka.x--;
      palikka.piirraPalikka();

    }
    if (event.code === "KeyD") {
      // höögeriin
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      palikka.x++;
      palikka.piirraPalikka();

    }
    event.preventDefault();
  }, true);
}





