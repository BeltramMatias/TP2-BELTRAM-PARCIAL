// numerosController.js
const numeroService = require('../services/numServices');

function guardarNumero(numero) {
  numeroService.guardarNumero(numero);
}

function calcularPromedio() {
  const numeros = numeroService.obtenerNumeros();
  if (numeros.length === 0) return 0;

  const suma = numeros.reduce((acc, num) => acc + num, 0);
  return suma / numeros.length;
}

function encontrarMinMax() {
  const numeros = numeroService.obtenerNumeros();
  if (numeros.length === 0) return { min: 0, max: 0 };

  const min = Math.min(...numeros);
  const max = Math.max(...numeros);
  return { min, max };
}

function contarNumeros() {
  const numeros = numeroService.obtenerNumeros();
  return numeros.length;
}

module.exports = {
  guardarNumero,
  calcularPromedio,
  encontrarMinMax,
  contarNumeros,
};
