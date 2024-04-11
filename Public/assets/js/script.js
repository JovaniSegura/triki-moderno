let input01 = document.querySelector('.input01')
let input02 = document.querySelector('.input02')
let validadorNombre1 = document.querySelector('.validadorNombre1')
let validadorNombre2 = document.querySelector('.validadorNombre2')
let vn1 = document.querySelector('.vn1')
let vn2 = document.querySelector('.vn2')
let inicioDesactivado = document.querySelector('.inicioDesactivado')
let rechazarColor = document.querySelector('.rechazarColor')

let jugadorA = ""
let jugadorB = ""

    input01.addEventListener('click', (e) => {
    e.preventDefault()
    vn1.classList.remove('rechazarColor')
    let input01Value = validadorNombre1.value
    if (input01Value.match(/[a-zA-Z]/)) {
        vn1.textContent = 'Jugador Registrado'
        jugadorA = input01Value
        sessionStorage.setItem('JugadorA', jugadorA)
        desactiva(jugadorA, jugadorB)
    } else {
        console.log('Pailas papi')
        vn1.textContent = 'Nombre Incorrecto'
    }
})

input02.addEventListener('click', (e) => {
    e.preventDefault()
    vn2.classList.remove('rechazarColor')
    let input02Value = validadorNombre2.value
    if (input02Value.match(/[a-zA-Z]/)) {
        vn2.textContent = 'Jugador Registrado'
        jugadorB = input02Value
        sessionStorage.setItem('JugadorB', jugadorB)
        desactiva(jugadorA, jugadorB)
    } else {
        vn2.textContent = 'Nombre Incorrecto'
    }
})

    const desactiva = (a, b) => {
        if (a != b) {
            if (a !== "" && b !== "") {
                inicioDesactivado.classList.remove('inicioDesactivado')
                vn1.textContent = 'Jugador Registrado'
                vn2.textContent = 'Jugador Registrado'
                vn1.classList.remove('rechazarColor')
                vn2.classList.remove('rechazarColor')
            }
        }
        else {
            console.log('Los usuarios no deben ser identicos')
            vn1.textContent = "Los nombres no deben ser identicos"
            vn2.textContent = "Los nombres no deben ser identicos"
            vn1.className = 'rechazarColor'
            vn2.className = 'rechazarColor'
        }
    }

// Eliminar valores de partidas ganadas del Sessión Storage
sessionStorage.setItem('JugApGan', 0)
sessionStorage.setItem('JugBpGan', 0)

function redireccionar() {
    window.location.href = '/procesar-formulario';
}