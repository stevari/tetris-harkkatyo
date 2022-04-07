
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

}
