const http = require("http")
const fs   = require("fs")

// Este modulo viene con Node.js
const zlib   = require("zlib")

// Variables Globales
let statusCodes = {
    400: "Petición incorrecta",
    404: "El recurso solicitado no existe",
    405: "Metodo HTTP no admitido"
}

let contentTypes = {
    html : "text/html",
    css  : "text/css",
    js   : "application/javascript",
    ico  : "image/x-icon"
}

// definimos el servidor HTTP y lo arrancamos
let servidor = http.createServer(procesarPeticion)

// Es una funcion asincrona
servidor.listen(2001, () => {
    console.log("esperando peticiones en el puerto 2001")
})

// Esta es la función que comenzará a procesar todas las peticiones
// Será ejecutada por el Event Loop
function procesarPeticion(request, response){
    let url = request.url
    console.log("==================================")
    console.log("Peticion recibida: " + url)

    if (request.method.toUpperCase() != "GET") {
        response.statusCode = 405
        response.end("Este recurso TOP no existe")
        return
    }
    /* if (url == "/favicon.ico") {
        response.statusCode = 404
        response.end("No hay favicon")
        return
    } */
    // A la url les quitaremos los query params...
    leerFichero(url, response)
}

// Leerá el fichero y lo colocará en el body de la respuesta
function leerFichero(ruta, response) {
    url = "./recursos" + ruta
    console.log("Buscando el recurso: " + ruta)
    let extension = url.split(".").pop()

    fs.readFile(url, (err, contenidoBuffer) => {
        if (err) {
            //Para simplificar supondremos que hay un error es porque el fichero no existe
            // response.statusCode = 404
            // response.end("404")
            devolverError(404, response)
            return
        }
        let contenido = contenidoBuffer.toString()
        response.setHeader("content-type", contentTypes[extension])
        response.end(contenido)
    })
}

function devolverError(statusCode, response) {
    let message = statusCodes[statusCode]
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
    </head
        <body>
            <h1 align="center">
                Web Server TOP
            </h1>
            <h2 align="center">${statusCode}, ${message}</h2>
        </body>
    </html>`
    response.setHeader("content-type", "text/html")
    response.end(html)
}