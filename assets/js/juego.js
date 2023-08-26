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
    throw "No hay cartas en el deck";
  }

  const carta = deck.shift();
  console.log(carta);
  return carta;
};

//Esta función me permite retonar el valor de una carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  let puntos = 0;

  /** Si el valor no es un número, entonces verifica si es una A y devuelve 11, si no devuelve 10,
   * en caso contrario devolvería el valor convertido a número
   */
  puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);

  return puntos;
};

console.log(valorCarta("AD"));
