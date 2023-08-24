/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of  Diamonds (Diamantes)
 * 2D = Two of  Hearts (Corazones)
 * 2D = Two of  Spades (Espadas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

//Esta función crea un nuevo deck o nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) deck.push(i + tipo);
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

//Esta función me permite tomar un carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "Nohay cartas en el deck";
  }

  const carta = deck.shift();
  console.log(carta);
  return carta;
};

//pedirCarta();
const valorCarta = () => {};
