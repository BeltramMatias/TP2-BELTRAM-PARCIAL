const numeros = [];

function guardarNumero(numero) {
  numeros.push(numero.numero);
}

function obtenerNumeros() {
  return numeros;
}

module.exports = {
  guardarNumero,
  obtenerNumeros,
};