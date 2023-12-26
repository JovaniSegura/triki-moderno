document.addEventListener('DOMContentLoaded', function () {
    // Recuperar valores del localStorage
    jugadorA = sessionStorage.getItem('JugadorA');
    jugadorB = sessionStorage.getItem('JugadorB');

    // Mostrar valores en pantalla
    document.querySelector('.jugadorA').textContent += jugadorA;
    document.querySelector('.jugadorB').textContent += jugadorB;
    console.log('Si entro al importName')
});