/*Vakioarvoiset muuttujat joita käytetään mm. pelikentän ja palikoiden renderöimiseen
määritellään täällä */
const SARAKKEET = 10; //Pelikenttä on mitoiltaan 10 x 20
const RIVIT = 20;
const BLOKIN_KOKO = 30; //Määrittää yhden palikan koon canvasilla. Suurempi arvo = suurempi pelkenttä

const MUODOT = [ //Kaikki tetromiinojen muodot matriiseina. 0 = tyhjä paikka, numero = väritetty paikka
  [],
  [[1, 1, 1, 1], //I
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]],

  [[2, 0, 0],
  [2, 2, 2], //J
  [0, 0, 0]],

  [[0, 0, 3],
  [3, 3, 3],  //L
  [0, 0, 0]],

  [[4, 4],
  [4, 4]], //O

  [[0, 5, 5],
  [5, 5, 0], //S
  [0, 0, 0]],

  [[0, 6, 0],
  [6, 6, 6], //T
  [0, 0, 0]],

  [[7, 7, 0],
  [0, 7, 7], //Z
  [0, 0, 0]]
];

const VARIT = [ //tetromiinojen värit
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
const KEY = { //Näppäimet. Käytetään useammassa eri luokassa
  VASEN: "KeyA",
  OIKEA: "KeyD",
  ALAS: "KeyS",
  YLOS:"KeyW"
}

const PISTEET = { //riveistä saadut pisteet
  YKSI: 100,
  TUPLA: 300,
  TRIPLA: 500,
  TETRIS: 800,
}