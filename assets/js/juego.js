
const miModulo=(() => {

    "use strict";

    let deck = [];

    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

    const smalls = document.querySelectorAll("small"),
          divCartasJugadores=document.querySelectorAll(".divCartas");

    let puntosJugadores=[];

    // esta funcion inicializa el juego
    const inicializarJuego = (numJugadores=2) => {
        deck = crearDeck();
        puntosJugadores=[];
        for(let i=0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }
        // console.clear();
        
       smalls.forEach(elemento=> elemento.innerText=0);
       divCartasJugadores.forEach(elemento=>elemento.innerHTML="");

        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }
    

    // crear deck
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (const tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (const especial of especiales) {
            for (const tipo of tipos) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);;
    }




    const pedirCarta = () => {

        if (deck.length === 0) {
            throw "no hay cartas en el deck";
        }
 
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? valor === "A" ? 11 : 10 : valor * 1;
    }

    //turno: 0=primer jugador y el ultimo será la computadora
    const acumularPuntos=(carta,turno)=>{
        puntosJugadores[turno] += valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta=(carta,turno)=>{
        const imgCarta = document.createElement("img");
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta");
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador=()=>{

        const[puntosMinimos,puntosComputadora]=puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert("nadie gana :(");
            } else if (puntosMinimos > 21) {
                alert("computadora gana");
            } else if (puntosComputadora > 21) {
                alert("jugador gana");
            } else {
                alert("computadora gana");
            }
        }, 400);
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora=0;

        do {
            const carta = pedirCarta();
            puntosComputadora=acumularPuntos(carta,puntosJugadores.length -1);
            crearCarta(carta,puntosJugadores.length -1);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    //Eventos

    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador=acumularPuntos(carta,0);

       crearCarta(carta,0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("21 genial");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    return {
        nuevoJuego:inicializarJuego
    }

})();









