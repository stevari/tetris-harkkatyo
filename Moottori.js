/*
Tämä luokka on pelilogiikan keskus. Moottori sitoo muut osat yhteen, alustaa kentän ja aloittaa
sekä lopettaa pelisession.
*/

const canvas = document.getElementById("kentta"); //haetaan pohjaksi kenttä, joka alustettiin html tiedostossa
const ctx = canvas.getContext("2d"); 

ctx.canvas.width = SARAKKEET*BLOKIN_KOKO; //Määritellään canvas vakioarvoilla
ctx.canvas.height = RIVIT*BLOKIN_KOKO;

ctx.scale(BLOKIN_KOKO,BLOKIN_KOKO); //Skaalataan konteksti

let kentta = new Kentta(); //luodaan uusi kenttä

function pelaa() { //Aloittaa pelin. Sidottu "pelaa" -nappiin
    kentta.reset(); //alustetaan kenttä
    console.table(kentta.grid);
    let palikka = new Palikka(ctx);
    palikka.piirraPalikka();
    
    kentta.palikka = palikka;
    //console.table(palikka.y);
}






