
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
    constructor(ctx) { 
        /*
        Palikka -olion täytyy tietää missä se on suhteessa pelikenttään ja minkä värinen ja
        muotoinen se on.
        Näitä tietoja varten se saa parametrikseen canvasin contextin tiedot. 
        */
      this.ctx = ctx; 
      this.color = 'blue';
      this.shape = [ 
        [0, 0, 0], 
        [2, 2, 2], 
        [2, 0, 0]
      ];
      
      
      this.x = 3; //aloituspositio canvasilla. (3,-1) = keskellä ylhäällä. (0,0) olisi kentän vasen yläreuna.
      this.y = -1;  
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
      poistaVanhaInstanssi(){
        this.ctx.fillStyle = "white"; 
        this.shape.forEach((rivi, y) => { 
          rivi.forEach((arvo, x) => {
            
            if (arvo > 0) { 
              this.ctx.fillRect(this.x + x, this.y + y, 1, 1); 
            } 
          });
        });
      }
  }
  