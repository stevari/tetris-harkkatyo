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

  piirra() { //piirtää palikan ja kentän
    this.palikka.piirraPalikka();
    this.piirraKentta();
  }

  pudotaPalikka() { 
    let p = liikkeet[KEY.ALAS](this.palikka);
    if (this.valid(p)) {
      this.palikka.liiku(p);
    } else {
      this.liimaaPalikkaKentalle();
      
      if (this.palikka.y === 0) {
        // Peli loppui
        return false;
      }
     this.luoUusiPalikka();
    }
    return true;
  }

  liimaaPalikkaKentalle() {
    this.palikka.shape.forEach((rivi, y) => {
      rivi.forEach((arvo, x) => {
        if (arvo > 0) {
          this.grid[y + this.palikka.y][x + this.palikka.x] = arvo; //täytetään gridin paikka palikan arvolla, eli nollat vaihtuvat palikan numeroiksi
        }
      });
    });
  }

  piirraKentta() { //piirtää matriisin jokaisen solun
    this.grid.forEach((rivi, y) => {
      rivi.forEach((arvo, x) => {
        if (arvo > 0) {
          this.ctx.fillStyle = VARIT[arvo];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  seinanSisalla(x) {
    return x >= 0 && x < SARAKKEET; //jos x < 0, palikka on vasemman seinän sisällä. jos taas x > SARAKKAAT (10), x on oikean seinän sisällä
  }

  pohjanYlapuolella(y) {
    return y <= RIVIT; //tarkistetaan, onko palikan y-arvo pohjan (RIVIT = 20) yläpuolella. Palikka ei saa mennä pohjasta läpi (y>20)
  }

  eiVarattu(x, y) {
    return this.grid[y] && this.grid[y][x] === 0; //tarkistetaan, onko kentän paikalla jo jotain, esim toinen palikka. jos on, arvot != 0, koska ne ovat väritetty
  }

  valid(p) { 
    return p.shape.every((row, dy) => { //käydään palikan (matriisin) jokainen arvo läpi tarkistaen, että seuraava (muutettu) arvo on validi
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          value === 0 ||
          (this.seinanSisalla(x) && this.pohjanYlapuolella(y) && this.eiVarattu(x, y))
        );
      });
    });
    
  }

  rotate(palikka) {
    //JSON.stringify() luo palikka -oliosta string -olion, jolla on palikan tiedot.
    //JSON.parse() muuntaa string olion takaisin palikka -olioksi
    //Kääntää palikan, eli matriisin 90 
    let klooni = JSON.parse(JSON.stringify(palikka)); 
    for (let y = 0; y < klooni.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [klooni.shape[x][y], klooni.shape[y][x]] = [klooni.shape[y][x], klooni.shape[x][y]]; //rivit sarakkeiksi ja päinvastoin
      }
    }
    klooni.shape.forEach(row => row.reverse());
    return klooni;
  }

  luoUusiPalikka() {
    this.palikka = new Palikka(ctx);
    this.palikka.piirraPalikka();
    //console.log("luouusipalikka kutsuttu")
  }


  getEmptyKentta() { //Luo matriisin joka koostuu tyhjistä soluista
    return Array.from(
      { length: RIVIT }, () => Array(SARAKKEET).fill(0)
    );
  }
}