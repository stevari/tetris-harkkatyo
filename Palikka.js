
/*
Tetris-palikoita, eli tetromiinoja on seitsemän erilaista.
Niiden muotoja merkitään yleensä kirjaimin I, J, L, O, S, T, ja Z.
Lisäksi tetromiinojen väri vaihtelee. 
Tetromiinoja, ja niiden värejä voi esittää kätevästi matriisina, 
esim.  L voisi olla 

[0, 0, 0],
[2, 2, 2],
[2, 0, 0];

jossa 2 tarkoittaa tiettyä värinumeroa.



Tetromiinojen tyyppiId:t : I = 1, J = 2, L = 3, O = 4, S = 5, T = 6, Z = 7
Löytyy siis vakiot.js/MUODOT

*/

class Palikka {
  ctx;
  x;
  y;
  color;
  shape;
  tyyppiId;


  constructor(ctx) {
    /*
    Palikka -olion täytyy tietää missä se on suhteessa pelikenttään ja minkä värinen ja
    muotoinen se on.
    Näitä tietoja varten se saa parametrikseen canvasin contextin tiedot. 
    */
    this.ctx = ctx;
    this.spawnaa();
  }
  spawnaa() {
    this.tyyppiId = this.randomTetromiinoTyyppi(VARIT.length - 1)
    this.shape = MUODOT[this.tyyppiId]
    this.color = VARIT[this.tyyppiId]
    this.x = 0
    this.y = 0

  }
  randomTetromiinoTyyppi(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes + 1);
  }


  piirraPalikka() {
    this.ctx.fillStyle = this.color; //väritetään haluamamme kohdat valitulla värillä
    this.shape.forEach((rivi, y) => { //loopataan matriisin sarakkeet ja rivit etsien soluja, joiden arvo poikkeaa nollasta
      rivi.forEach((arvo, x) => {
        /*
         (this.x, this.y) on palikan vasen ylänurkka.
         

         Jos solun arvo on erisuuri kuin 0, ts. jos solu ei ole tyhjä, se täytetään valitulla värillä.
         Näin palikka piirtyy kentälle.
        */
        if (arvo > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }


  validiSiirto(suunta) {
    //testataan onko seuraava siirto, esim. liike oikealle mahdollinen (rajojen sisällä eikä törmäyksiä)
    //palikan tyypin ja nykyisen sijainnin perusteella
    let xPos = this.x;
    let yPos = this.y;
    let leveys = MUODOT[this.tyyppiId].length //palikan leveys

    if (suunta == "alas") {
      return yPos < 18 //testataan ettei mene alareunan ali
    } else if (suunta == "vasemmalle" && xPos <= 0) {//testataan ettei mene vasemmalta reunan yli
      return false
    } else if (suunta == "oikealle") { //seuraavassa switchissä testataan ettei mene oikealta puolelta yli. Helpoin tapa on laskea xPos + palan leveys
      return (xPos+leveys<10)
      //console.log("tyyppi lenght",leveys)
    }else{
      return true
    }
  }

  liiku(suunta) {
    if (this.validiSiirto(suunta)) {
      switch (suunta) {
        case "alas":
            this.y++;
          break
        case "oikealle":
          this.x++;
          break
        case "vasemmalle":
          this.x--;
      }

    }

    this.piirraPalikka();
    console.log("palikan päivitetty pos y", palikka.y)
    console.log("palikan päivitetty pos x", palikka.x)

  }

}
