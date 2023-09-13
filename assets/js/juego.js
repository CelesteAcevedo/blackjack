/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of  Diamonds (Diamantes)
 * 2D = Two of  Hearts (Corazones)
 * 2D = Two of  Spades (Espadas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
  puntosComputadora = 0;
// Referencias del Html
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const totalJugador = document.querySelector("#totalJugador");
const totalComputadora = document.querySelector("#totalComputadora");
const jugadorCartas = document.querySelector("#jugador-cartas");
const computadoraCartas = document.querySelector("#computadora-cartas");

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
  return carta;
};

//Esta función me permite retonar el valor de una carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  /** Si el valor no es un número, entonces verifica si es una A y devuelve 11, si no devuelve 10,
   * en caso contrario devolvería el valor convertido a número
   */
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
};

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    totalComputadora.innerText = puntosComputadora;

    //   <img class="carta" src="assets/cartas/2C.png"/>
    const img = document.createElement("img");
    img.src = "assets/cartas/" + carta + ".png";
    img.className = "carta";
    computadoraCartas.appendChild(img);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
};

// Evento pedir
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  totalJugador.innerText = puntosJugador;

  //   <img class="carta" src="assets/cartas/2C.png"/>
  const img = document.createElement("img");
  img.src = "assets/cartas/" + carta + ".png";
  img.className = "carta";
  jugadorCartas.appendChild(img);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    alertaRetrasada("¡Perdiste!");
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    alertaRetrasada("¡21 Genial!");
  }
});

const alertaRetrasada = (alerta) => {
  setTimeout(() => {
    alert(alerta);
  }, 100);
};

// Evento detener
btnDetener.addEventListener("click", () => {
  turnoComputadora(puntosJugador);
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  if (puntosComputadora > 21) {
    alertaRetrasada("¡Ganaste!");
  } else if (puntosJugador < puntosComputadora) {
    alertaRetrasada("¡Perdiste!");
  } else if (puntosJugador > puntosComputadora) {
    alertaRetrasada("¡Ganaste!");
  } else {
    alertaRetrasada("¡Nadie gana!");
  }
});

// Evento Nuevo Juego
btnNuevo.addEventListener("click", () => {
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  deck = [];
  crearDeck();

  totalJugador.innerText = 0;
  totalComputadora.innerText = 0;
  puntosJugador = 0;
  puntosComputadora = 0;

  jugadorCartas.replaceChildren("");
  computadoraCartas.replaceChildren("");
});
