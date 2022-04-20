/*
Tämä luokka on pelilogiikan keskus. Moottori sitoo muut osat yhteen sekä aloittaa
sekä lopettaa pelisession.
*/
const canvas = document.getElementById("kentta"); //haetaan pohjaksi kenttä, joka alustettiin html tiedostossa
const ctx = canvas.getContext("2d");
const kentta = new Kentta(ctx); //luodaan uusi kenttä
const time = { start: 0, elapsed: 0, level: 1000 }; //alustetaan aika (arvot millisekunteja). Mitä pienempi level, sitä nopeammin palikat putoaa kentällä
const peliKaynnissa = true

function clear() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //poistaa vanhan instanssin
}

let requestId;

function paivitaTaso() { //päivittää tason, eli lyhentää animaation päivitysaikaa

  switch (kentta.pisteet) {
    case 4000:
      time.level = 250
      break
    case 3000:
      time.level = 450
      break
    case 2000:
      time.level = 600
      break
    case 1000:
      time.level = 750
      break
  }

}

function animate(now = 0) { //toimii looppina, mahdollistaa mm. palikan jatkuvan putoamisen

  paivitaTaso();

  time.elapsed = now - time.start; //kulunt aika = nykinen aika - aloitusaika
  if (time.elapsed > time.level) { //jos ajastimen aika on määrättyä aikaa suurempi, suorita
    time.start = now;

    clear();
    if (!kentta.pudotaPalikka()) { //palikka putoaa koko olemassaolonsa aikana, kunnes se osuu johonkin
      this.lopetaPeli(); //jos palikkaa uutta palikkaa ei voida luoda, peli loppuu. Eli silloin kun palikat menee ns. katosta läpi
      return
    }


  }
  kentta.piirra(); //piirretään kenttä uudestaan päivitetyillä arvoilla
  requestId = requestAnimationFrame(animate);
}

const liikkeet = { //kaikki liikkeet, jotka käyttäjällä on käyettävissä. Näppäimet määritetelty vakioissa

  [KEY.VASEN]: p => ({ ...p, x: p.x - 1 }), //... kopio olion (shallow copy). tämä on uusi olio samoilla arvoilla. Eli kopioidaan p:hen palikka -olio, jonka arvoja muutetaan painetun näppäimen perusteella
  [KEY.OIKEA]: p => ({ ...p, x: p.x + 1 }),
  [KEY.ALAS]: p => ({ ...p, y: p.y + 1 }),
  [KEY.YLOS]: p => kentta.rotate(p) //rotatoi palikan. Eli luo palikasta kopion, jota käänellään, ja palauttaa kopion.


};


function pelaa() { //Aloittaa pelin. Sidottu "pelaa" -nappiin
  if (peliKaynnissa) {
    kentta.reset(); //alustetaan kenttä

    time.start = performance.now();
    this.animate(); //looppi käyntiin

    document.addEventListener('keydown', event => {

      //liikkuminen tapahtuu luomalla palikka -oliosta kopio, ja muuttamalla VAIN kopion arvoja.
      //Kopio liitetään kenttään, alkuperäinen häviää
      if (liikkeet[event.code]) { //event.code = ennalta määritelty näppäin, esim. KEY.OIKEA
        event.preventDefault();

        let p = liikkeet[event.code](kentta.palikka); //luodaan palikasta kopio, ja muokataan kopion arvoja 
        if (kentta.valid(p)) {
          clear();
          kentta.palikka.liiku(p); //p sisältää kopion palikka -oliosta, sekä painetun näppäimen tiedot, jotka lähetetään palikka -olion liiku() -metodille

        }
      }
    });
  }

}

function lopetaPeli() {  //lopettaa loopin
  this.peliKaynnissa = false
  cancelAnimationFrame(requestId) //lopettaa animoinnin
  //console.log("peli loppui")
}




