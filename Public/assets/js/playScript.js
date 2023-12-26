let $main = document.querySelector("#tablero")
let turnoJug = document.querySelector('.turnoJug')
let finPartida = document.querySelector('.finPartida')

// Recuperar valores del localStorage
jugadorA = sessionStorage.getItem('JugadorA');
jugadorB = sessionStorage.getItem('JugadorB');

let XO = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]
let OX = ["O", "X", "O", "X", "O", "X", "O", "X", "O"]
let llenado = []

function finalizarPartida() {
    window.location.href = '/';
}

function jugarDeNuevo() {
    window.location.href = '/procesar-formulario';
}

const nAleatorio = Math.floor(Math.random() * 2) + 1

if (nAleatorio === 1) {
    turnoJug.textContent = 'Turno para ' + jugadorA;
    X()
} else {
    turnoJug.textContent = 'Turno para ' + jugadorB;
    O()
}

function X() {
    let todos = document.querySelectorAll('.todos')
    for (let i = 0; i < todos.length; i++) {
        todos[i].style.cursor = ('url(../../img/X.png), auto')
    }
}

function O() {
    let todos = document.querySelectorAll('.todos')
    for (let i = 0; i < todos.length; i++) {
        todos[i].style.cursor = ('url(../../img/O.png), auto')
    }
}

for (let i = 0; i < 9; i++) {
    let $input = document.createElement("input")
    $main.appendChild($input)
    $input.type = "button"
    $input.className = "todos p" + i
    if (nAleatorio === 1) {
        X()
    } else {
        O()
    }
    $input.addEventListener("click", () => {
        if (nAleatorio === 1) {
            valor = XO.shift()
        } else {
            valor = OX.shift()
        }
        $input.value = valor
        if (valor === 'O') {
            turnoJug.textContent = 'Turno para ' + jugadorA
            X()
        } else {
            turnoJug.textContent = 'Turno para ' + jugadorB
            O()
        }
        $input.style.pointerEvents = "none"
        ganar()
    })
    llenado.push($input)
}

function ganar() {
    let posibles = [
        //filas
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //Columnas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //Diagonales
        [0, 4, 8],
        [2, 4, 6]
    ];

    let alguienGano = false;

    for (let recorrer of posibles) {
        let [a, b, c] = recorrer;
        if (llenado[a].value === llenado[b].value && llenado[b].value === llenado[c].value && llenado[a].value !== "") {
            alguienGano = true;
            mostrarAlerta(valor)
            setTimeout(() => {
                jugarDeNuevo();
            }, 5000);
            return;
        }
    }

    // Verificar si todos los campos están llenos pero nadie ha ganado
    if (!alguienGano && todosCamposLlenos()) {
        mostrarAlerta()
        setTimeout(() => {
            jugarDeNuevo();
        }, 5000);
    }
}

// Función para verificar si todos los campos están llenos
function todosCamposLlenos() {
    for (let campo of llenado) {
        if (campo.value === "") {
            return false;
        }
    }
    return true;
}

function conteoRegresivo() {
    var timeLeft = 4;
    setInterval(function () {
        document.querySelector('.alertaHijo2').innerHTML = 'La proxima partida continuara en ' + timeLeft + ' seg...';
        timeLeft -= 1;
    }, 1000);
}

// Obtener los valores del sessionStorage al cargar la página  | Inicar en 0
let incJugApGan = parseInt(sessionStorage.getItem('JugApGan')) || 0;
let incJugBpGan = parseInt(sessionStorage.getItem('JugBpGan')) || 0;
sessionStorage.setItem('JugApGan', incJugApGan)
sessionStorage.setItem('JugBpGan', incJugBpGan)

// mostrar por pantalla los valores traidos del sessionStorage
let ganA = document.querySelector('.ganA')
let ganB = document.querySelector('.ganB')
ganA.textContent = sessionStorage.getItem('JugApGan')
ganB.textContent = sessionStorage.getItem('JugBpGan')

// Simula celebración real de papeles picados tirados al aire
function celebracion() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

function mostrarAlerta(valor) {
    turnoJug.textContent = ''
    turnoJug.style.backgroundColor = 'transparent'
    let alertaPadre = document.querySelector('.alertaPadre');
    alertaPadre.style.height = '200px'
    let alerta = document.querySelector('.alertaHijo1');
    conteoRegresivo()

    if (valor === 'X') {
        celebracion()
        incJugApGan += 1
        sessionStorage.setItem('JugApGan', incJugApGan)
        ganA.textContent = sessionStorage.getItem('JugApGan')
        alerta.textContent = ('Ganador: ' + jugadorA);
        bloquearPagina()
        return
    } else if (valor === 'O') {
        celebracion()
        incJugBpGan += 1
        sessionStorage.setItem('JugBpGan', incJugBpGan)
        ganB.textContent = sessionStorage.getItem('JugBpGan')
        alerta.textContent = ('Ganador: ' + jugadorB);
        bloquearPagina()
        return
    } else {
        alerta.textContent = ('No hay Ganador');
        bloquearPagina()
        return
    }
}

function bloquearPagina() {
    // Crear un contenedor para todo el contenido
    const contenedor = document.createElement('div');
    // Agregar el contenedor al cuerpo del documento
    document.body.appendChild(contenedor);
    // Crearle una clase para poder darle estilos desde el css
    contenedor.classList.add('paginaBloqueada')

    // Deshabilitar clic izquierdo en el contenedor
    contenedor.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });
}