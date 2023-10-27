const express = require('express');
const router = express.Router();
const numerosController = require('../controllers/numerosController');

router.post('/entrada', (req, res) => {
  const numero = req.body;
  numerosController.guardarNumero(numero);
  res.json({ message: 'Número ingresado con éxito' });
});

router.get('/entrada', (req, res) => {
  const numeros = numerosController.contarNumeros();
  res.json({ numeros });
});

router.get('/promedio', (req, res) => {
  const promedio = numerosController.calcularPromedio();
  res.json({ promedio });
});

router.get('/minmax', (req, res) => {
  const { min, max } = numerosController.encontrarMinMax();
  res.json({ min, max });
});

router.get('/cantidad', (req, res) => {
  const cantidad = numerosController.contarNumeros();
  res.json({ cantidad });
});

module.exports = router;
