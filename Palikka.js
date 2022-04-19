
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
  shape; //muoto eli matriisin muoto ja väri
  tyyppiId; //käytetään tetromiinot muodon ja värin määrittelyyn. arvo on väliltä 1-7
  //rotaatioasento

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
    //this.rotaatioAsento = 0;
  }


  randomTetromiinoTyyppi(tyyppienMaara) {
    return Math.floor(Math.random() * tyyppienMaara + 1);
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


liiku(p) { //liikuttaa palikkaa manipuloimalla sen x ja y koordinaatteja
  this.x = p.x;
  this.y = p.y;
  this.shape = p.shape;
  //p on silloisen palikka -olion kopio
  //* sidoksissa kentän validoi -funktioon. Liiku -funktio ei toimi jos seuraava liike ei ole validi
}

}
