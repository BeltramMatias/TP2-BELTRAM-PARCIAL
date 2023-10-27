document.addEventListener('DOMContentLoaded', () => {
    const numeroForm = document.getElementById('numeroForm');
    const resultadoDiv = document.getElementById('resultado');

    numeroForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const numeroInput = document.getElementById('numero');
        const numero = parseFloat(numeroInput.value);

        if (!isNaN(numero)) {
            fetch('/numeros/entrada', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ numero })
            })
            .then(response => response.json())
            .then(data => {
                // Muestra la respuesta del servidor en la página
                resultadoDiv.textContent = `Número ingresado: ${data.numero}`;
            })
            .catch(error => {
                resultadoDiv.textContent = `Error: ${error.message}`;
            });
        } else {
            resultadoDiv.textContent = 'Ingresa un número válido.';
        }
    });
});
