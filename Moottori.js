/*
Tämä luokka on pelilogiikan keskus. Moottori sitoo muut osat yhteen, alustaa kentän ja aloittaa
sekä lopettaa pelisession.
*/
const canvas = document.getElementById("kentta"); //haetaan pohjaksi kenttä, joka alustettiin html tiedostossa
const ctx = canvas.getContext("2d");
const kentta = new Kentta(ctx); //luodaan uusi kenttä
const time = { start: 0, elapsed: 0, level: 1000 };

function clear() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //poistaa vanhan instanssin
}
let requestId;

function animate(now = 0) { //toimii looppina, mahdollistaa mm. palikan jatkuvan putoamisen
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    clear();
    kentta.pudotaPalikka(); 
  }
  kentta.piirra(); //piirretään kenttä uudestaan päivitetyillä arvoilla
  requestId = requestAnimationFrame(animate);
}




function pelaa() { //Aloittaa pelin. Sidottu "pelaa" -nappiin
  kentta.reset(); //alustetaan kenttä

  let palikka = kentta.palikka
  time.start = performance.now();
  this.animate(); //looppi käyntiin
  //luodaan uusi palikka aina kun palikka on laskeutunut


  document.addEventListener("keydown", function (event) {


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

      if (palikka.validiSiirto("rotate")) {
        clear();
        palikka.rotate(palikka);
        //console.log("palikan päivitetty leveys",palikka.getTodellinenLeveys())
      }

    }
    event.preventDefault();
    //console.log("palikan muoto",palikka.shape)

    //console.log("kentän koko",SARAKKEET*BLOKIN_KOKO)
  }, true);
}





