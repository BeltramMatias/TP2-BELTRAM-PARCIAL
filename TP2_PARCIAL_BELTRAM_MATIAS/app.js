const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const numerosFilePath = 'numeros.json';

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.post('/numeros/entrada', async (req, res) => {
  try {
    const { numero } = req.body;

    if (typeof numero === 'number') {
      const numerosData = await fs.readFile(numerosFilePath, 'utf-8');
      const numeros = JSON.parse(numerosData);
      numeros.push(numero);
      await fs.writeFile(numerosFilePath, JSON.stringify(numeros));
      res.status(201).json({ mensaje: 'Número ingresado con éxito' });
    } else {
      res.status(400).json({ mensaje: 'El número debe ser un valor numérico' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

app.get('/numeros/entrada', async (req, res) => {
  try {
    const numerosData = await fs.readFile(numerosFilePath, 'utf-8');
    const numeros = JSON.parse(numerosData);
    res.json({ numeros });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

app.get('/numeros/promedio', async (req, res) => {
  try {
    const numerosData = await fs.readFile(numerosFilePath, 'utf-8');
    const numeros = JSON.parse(numerosData);

    if (numeros.length === 0) {
      res.status(400).json({ mensaje: 'No hay números para calcular el promedio' });
    } else {
      const promedio = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;
      res.json({ promedio });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

app.get('/numeros/minmax', async (req, res) => {
  try {
    const numerosData = await fs.readFile(numerosFilePath, 'utf-8');
    const numeros = JSON.parse(numerosData);

    if (numeros.length === 0) {
      res.status(400).json({ mensaje: 'No hay números para encontrar el mínimo y máximo' });
    } else {
      const min = Math.min(...numeros);
      const max = Math.max(...numeros);
      res.json({ min, max });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

app.get('/numeros/cantidad', async (req, res) => {
  try {
    const numerosData = await fs.readFile(numerosFilePath, 'utf-8');
    const numeros = JSON.parse(numerosData);
    const cantidad = numeros.length;
    res.json({ cantidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
