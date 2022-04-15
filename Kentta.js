/*

Pelikenttä (2D matriisi) koostuu tyhjistä ja täytetyistä soluista.
Tyhjää solua merkitään numerolla 0, värejä numeroilla 1-7

*/

class Kentta {
  ctx;
  grid;
  palikka;

  constructor(ctx) { //construktori saa ctx:n referenssiksi
    this.ctx = ctx;
    this.alusta(); //alustetaan kenttä

  }
  alusta() {
    ctx.canvas.width = SARAKKEET * BLOKIN_KOKO; //Määritellään canvas vakioarvoilla
    ctx.canvas.height = RIVIT * BLOKIN_KOKO;
    ctx.scale(BLOKIN_KOKO, BLOKIN_KOKO); //Skaalataan konteksti jotta palikan mitat sopii kentän mittoihin
  }

  reset() { //Resetoi kentän ja luo palikan
    this.grid = this.getEmptyKentta();
    this.palikka = new Palikka(ctx);
    this.palikka.piirraPalikka();

  }
  piirra() {
    this.palikka.piirraPalikka();
    this.piirraKentta();
  }
  pudotaPalikka() {
    if(this.palikka.validiSiirto("alas")){
      this.palikka.liiku("alas");
    }else{
      this.liimaaPalikkaKentalle();
    }
    
  }

  liimaaPalikkaKentalle() {
    this.palikka.shape.forEach((rivi, y) => {
      rivi.forEach((arvo, x) => {
        if (arvo > 0) {
          this.grid[y + this.palikka.y][x + this.palikka.x] = arvo;
        }
      });
    });
  }

  piirraKentta() {
    this.grid.forEach((rivi, y) => {
      rivi.forEach((arvo, x) => {
        if (arvo > 0) {
          this.ctx.fillStyle = VARIT[arvo];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }


  /*luoUusiPalikka() {
    this.reset();
    console.log("luouusipalikka kutsuttu")
  }
*/

  getEmptyKentta() { //Luo matriisin joka koostuu tyhjistä soluista
    return Array.from(
      { length: RIVIT }, () => Array(SARAKKEET).fill(0)
    );
  }
}