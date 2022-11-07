const contenedor = document.getElementById('contenedor');
const sonriente = document.getElementById('sonriente');

// HACER TABLERO EN HTML
function hacerTablero(x, y) {
    var juego = document.createElement("div");
    juego.setAttribute("id", "juego");
    for (var i = 0; i < x; i++) {
        var casillas = document.createElement("div");
        casillas.setAttribute("class", "casillas");
        for (var j = 0; j < y; j++) {
            var casilla = document.createElement("div");
            casilla.classList.add("casilla");
            casilla.classList.add("cerrado");
            casilla.setAttribute("id", i + "-" + j);
            casillas.appendChild(casilla);
        }
        juego.appendChild(casillas);
    }
    contenedor.appendChild(juego);
}

// COLOCAR BOMBAS EN EL TABLERO
function colocarbombas(filas, columnas, bombas) {
    var bombasColocadas = 0;
    while (bombasColocadas < bombas) {
        var fila = Math.floor(Math.random() * filas);
        var columna = Math.floor(Math.random() * columnas);
        var casilla = document.getElementById(fila + "-" + columna);
        if (!casilla.classList.contains("bomba")) {
            casilla.classList.add("bomba");
            casilla.classList.add("ocultarBomba");
            bombasColocadas++;
        }
    }
}

// MOSTRAR TODAS LAS BOMBAS
function mostrarBombas() {
    casillas.forEach(casilla => {
        if (casilla.classList.contains("bomba")) {
            casilla.classList.remove("ocultarBomba");
        }
    });
}

// TERMINAR PARTIDA
function terminarPartida() {
    casillas.forEach(casilla => {
        casilla.classList.add("terminado");
    }); 
}

// NUMEROS
function numeros(casilla) {
    nbombas = 0;
    listafc = casilla.id.split("-");
    fila = parseInt(listafc[0]);
    columna = parseInt(listafc[1]);
    for (i = Math.max(0, fila - 1); i <= Math.min(11, fila + 1); i++) {
        for (j = Math.max(0, columna - 1); j <= Math.min(11, columna + 1); j++) {
            casillaVecina = document.getElementById(i + "-" + j);
            if (casillaVecina.classList.contains("bomba")) {
                nbombas++;
            }
        }
    }
    if (nbombas > 0) {
        if (nbombas == 1) {
            casilla.classList.add("uno");
        } else if (nbombas == 2) {
            casilla.classList.add("dos");
        } else if (nbombas == 3) {
            casilla.classList.add("tres");
        } else if (nbombas == 4) {
            casilla.classList.add("cuatro");
        } else if (nbombas == 5) {
            casilla.classList.add("cinco");
        } else if (nbombas == 6) {
            casilla.classList.add("seis");
        } else if (nbombas == 7) {
            casilla.classList.add("siete");
        } else if (nbombas == 8) {
            casilla.classList.add("ocho");
        }
        casilla.innerHTML = nbombas;
    }
}

// REVELAR CASILLAS VECINAS CON 0 BOMBAS
function revelarCasillasVecinas(casilla) {
    if (casilla.classList.contains("cerrado")) {
        casilla.classList.add("abierto");
        casilla.classList.remove("cerrado");
        casilla.classList.add("numero");
        listafc2 = casilla.id.split("-");
        fila2 = parseInt(listafc2[0]);
        columna2 = parseInt(listafc2[1]);
        for (k = Math.max(0, fila2 - 1); k <= Math.min(11, fila2 + 1); k++) {
            for (l = Math.max(0, columna2 - 1); l <= Math.min(11, columna2 + 1); l++) {
                casillaVecina = document.getElementById(k + "-" + l);
                if (casillaVecina.classList.contains("cerrado") && !casillaVecina.classList.contains("bomba")) {
                    casillaVecina.classList.remove("cerrado");
                    casillaVecina.classList.add("abierto");
                    casillaVecina.classList.add("numero");
                    numeros(casillaVecina);
                }
            }
        }
    }
}

// GANAR PARTIDA
function ganarPartida() {
    var ganar = true;
    casillas.forEach(casilla => {
        if (!casilla.classList.contains("bomba") && casilla.classList.contains("cerrado")) {
            ganar = false;
        }
    });
    if (ganar) {
        sonriente.classList.add("ganar");
        mostrarBombas();
        terminarPartida();
    }
}

// CRONOMETRO
function reloj(casilla) {
    var tiempo = 0;
    var intervalo = setInterval( () => {
        tiempo++;
        cronometro.innerHTML = tiempo;
        if (casilla.classList.contains("terminado")) {
            clearInterval(intervalo);
        }
    }, 1000);
}

hacerTablero(12, 12);
colocarbombas(12, 12, 22);

casillas = document.querySelectorAll(".casilla");
empezado = false;

// COMPORTAMIENTO DE LAS CASILLAS
casillas.forEach(casilla => {
    // CLICK IZQUIERDO
    casilla.addEventListener("click", () => {
        if (empezado == false) {
            reloj(casilla);
            empezado = true;
        }
        if (casilla.classList.contains("terminado")) {
            return;
        } else {
            if (casilla.classList.contains("bandera")) {
                return;
            }else if (casilla.classList.contains("bomba")) {
                casilla.classList.remove("cerrado");
                casilla.classList.add("abierto");
                mostrarBombas();
                terminarPartida();
                sonriente.classList.remove("happy");
                sonriente.classList.add("angry");
            } else {
                numeros(casilla);
                revelarCasillasVecinas(casilla);
                ganarPartida();
            }
        }
    });
    // BANDERA
    casilla.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (casilla.classList.contains("terminado")) {
            return;
        } else if (casilla.classList.contains("cerrado")) {
            casilla.classList.add("bandera");
            casilla.classList.remove("cerrado");
        } else if (casilla.classList.contains("bandera")) {
            casilla.classList.add("cerrado");
            casilla.classList.remove("bandera");
        }
    });
});

sonriente.addEventListener("click", () => {
    window.location.reload();
});