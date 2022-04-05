/*
Tämä luokka on pelilogiikan keskus. Moottori sitoo muut osat yhteen, alustaa kentän ja aloittaa
sekä lopettaa pelisession.
*/

const canvas = document.getElementById("kentta"); //haetaan pohjaksi kenttä, joka alustettiin html tiedostossa
const ctx = canvas.getContext("2d");

ctx.canvas.width = SARAKKEET * BLOKIN_KOKO; //Määritellään canvas vakioarvoilla
ctx.canvas.height = RIVIT * BLOKIN_KOKO;

ctx.scale(BLOKIN_KOKO, BLOKIN_KOKO); //Skaalataan konteksti jotta palikan mitat sopii kentän mittoihin


let kentta = new Kentta(); //luodaan uusi kenttä


function pelaa() { //Aloittaa pelin. Sidottu "pelaa" -nappiin
  kentta.reset(); //alustetaan kenttä
  let palikka = new Palikka(ctx);

  console.log("palikan aloitus pos y", palikka.y)

  palikka.piirraPalikka();



  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "KeyS") {
      // alaspäin
      //palikka.poistaVanhaInstanssi();
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





