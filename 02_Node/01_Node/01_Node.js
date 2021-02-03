// En Node.js la consola es la consola del sistema
// Módulos en node
let http = require("http")

let servidorHTTP = http.createServer( function(request, response) {
  console.log("Petición http recibida")
  // el objeto request va a salir por consola, una vez ejecutado F8
  console.log(request.method)
  console.log(request.headers)
  console.log(request.url)

  let contenidoBody = crearHTML()
  response.end(contenidoBody)

})

// Arrancamos el objeto server
// listen es una funcion ASYNC
servidorHTTP.listen(1000)
console.log("Esperando peticiones en el puerto 1000")


function crearHTML(){

  let html = `
  <html>
      <head>
          <meta charset="UTF-8">
          <title>Nuestra primera web chispas</title>
      </head>
      <body>
          <h2 align="center">
              <font color="lightGreen">
                  Contenido HTML generado dinámicamente
              </font>
          </h2>
          <table align="center" border="1">
            <tr>
                <th>Titulo</th>
                <th>Director</th>
            </tr>`;
      let peliculas = listarPeliculas()
      for(let pelicula of peliculas) {
        html += `
          <tr>
            <td>${pelicula.titulo}</td>
            <td>${pelicula.titulo}</td>
          </tr>
        `
      }
      html += `
            </table>
          </body>
      </html>
      `
  return html
}

function listarPeliculas(){
  //Simulamos una consulta a la bb.dd.
  return [
      {
          titulo : 'Indiana Jones',
          director : 'Steven Spielberg'
      },
      {
          titulo : 'Depredador',
          director : 'John McTiernan'
      },
      {
          titulo : 'Los Gremlins',
          director : 'Joe Dante'
      },
      {
          titulo : 'Tron',
          director : 'Steven Lisberger'
      },
      {
          titulo : 'El padrino',
          director : 'Scorsese'
      }
  ]
}
