const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;
// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Ejecuta el código Python
    exec('python3 flip.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error interno del servidor');
        }

        const imgData = './path.png'// stdout.trim();
        

        let path = JSON.parse(stdout)

        let result = {
            title: 'GBP/USD'
        }
        // Renderizar la página HTML con la imagen
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Path FX</title>
            </head>
            <body>
                <h1>${result.title}</h1>
                <label for="currencySelect">Selecciona un par de divisas:</label>
                <select id="currencySelect" onchange="handleSelection()">
                  <option value="" disabled selected>Seleccionar par de divisas</option>
                  <option value="EUR/USD">EUR/USD</option>
                  <option value="GBP/USD">GBP/USD</option>
                </select>
                <img src="${imgData}" alt="Python Plot">
                <div>
                    <pre>
        ${path}
                    </pre>
                </div>
            </body>
            </html>
        `);

        console.log(`Resultado: ${stdout}`);
        //res.send(`Resultado: ${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`Servidor Node.js en http://localhost:${port}`);
});
