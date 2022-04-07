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

  getEmptyKentta() { //Luo matriisin joka koostuu tyhjistä soluista
    return Array.from(
      { length: RIVIT }, () => Array(SARAKKEET).fill(0)
    );
  }
}