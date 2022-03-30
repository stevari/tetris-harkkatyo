/*

Pelikenttä (2D matriisi) koostuu tyhjistä ja täytetyistä soluista.
Tyhjää solua merkitään numerolla 0, värejä numeroilla 1-7

*/

class Kentta {
  
    
    reset() { //Resetoi kentän
      this.grid = this.getEmptyKentta();
    }
    
    
    getEmptyKentta() { //Luo matriisin joka koostuu tyhjistä soluista
      return Array.from(
        {length: RIVIT}, () => Array(SARAKKEET).fill(0)
      );
    }
  }