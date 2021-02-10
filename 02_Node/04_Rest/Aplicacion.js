// API REST

const http = require("http")
// const restUtil = require("./restUtil") // cacacacacacacacCACAXCACACACA
const filmBussines = require("./negocioPeliculas.js")
const mongoDBUtil = require("./mongoDBUtil")
const restUtil = require("./restUtil")

// La función conectar recibe como parametro un callback que se invocará cuando la conexión se haya establecido
// (en el archivo mongoDBUtil al exports.conectar se le pasa un callback)
mongoDBUtil.conectar(arrancarServidor)

function arrancarServidor() {
  console.log("Creando el servidor...")
  http.createServer(processRequest)
  .listen(3000, function() {
      console.log("Esperando peticiones en el puerto 3000")
  })
}


/* MÉTODO	URL			        BODY	FUNCIONALIDAD
------------------------------------------------------------------
GET	    /peliculas		    -	    listar las pelicula
GET	    /peliculas/{id}  	-	    buscar una pelicula por su id
POST	/peliculas		    {json}	insertar la pelicula
PUT 	/peliculas/{id}  	{json}  modificar la pelicula
DELETE  /peliculas/{id}  	-	    borrar una pelicula
*/

// En esta funcion haremos un triaje de la peticion recibida.
// ESTA FUNCION SOLO HACE UNA COSA, QUIEN HACE EL REQUEST.
function processRequest(request, response) {
  let method = request.method.toUpperCase();
  let url    = request.url
  // && - Si la primera condicion no se cumple, no entra en la segunda
  if( method=="GET" && url=="/films"){
      listFilm(request, response)
  } else if( method=="GET" && url.match("^/films/[0-9a-fA-F]{24}$") ) {
      findFilm(request, response)
  } else if( method="POST" && url=="/films"){
      insertFilm(request, response)
  } else if( method="PUT" && url.match("^/films/[0-9a-fA-F]{24}$") ){
      modifyFilm(request, response)
  } else if( method="DELETE" && url.match("^/films/[0-9a-fA-F]{24}$") ){
      deleteFilm(request, response)
  } else {
      //404
      console.log("???")
      response.end("???")
  }
}


// Tareas a realizar por la lógica de control en un servicio REST //

//-Averiguar qué nos están pidiendo (esto ya lo hemos hecho arriba con los preciosos IF anidados)
//
//-Extraer de la petición los valores necesarios para procesarla
// Estos valores podrán venir como:
// -parametros en la query (?)
// -parámetros en el body
// -parámetros en la url
// -parámetros en el HEAD
// -un JSON en el body (o cualquier otro formato)
// -cualquier combinación de lo anterior
//
//-Invocar la función con la lógica de negocio
//
//-Si la lógica de negocio ha devuelto algo que le interesde al cliente configurar
// la respuesta para entregarlo
//
//-FIN

// Recibe esa peticion, ve en que consiste, saca de ellas los datos necesarios... etc
// Todas estas funciones guardan la logica de control.

//200 OK
//Content-Type : application/json
//-------------------------------
//{ pelicula }
//
//404 Not found
//Content-Type : application/json
//-------------------------------
//{ codigo:404, mensaje:"La pelicula solicitada no existe"}
//
//500 Internan server error
//Content-Type : application/json
//-------------------------------
//{ codigo:500, mensaje:"Error al buscar la pelicula."}

//GET /peliculas
function listFilm(request, response) {
  // aqui hace falta un criterio de busqueda
  console.log("Listing films")
  filmBussines.listFilm()
}

//GET /peliculas/:id
function findFilm(request, response) {
  console.log("Find films")
  let id = request.url.split("/").pop()
  filmBussines
    .findFilm(id)
    .then(function(film){
      if(!film) {
        //404
        restUtil.devolverError(response, 404, "La película solicitada no existe")
        return
      }
      response.setHeader("Content-type", "application/json")
      response.end(JSON.stringify(film))
    })
    .catch(function(err){
      restUtil.devolverError(response, 500, "Error al buscar la película")
    })
}

//POST /peliculas
//CT: app/json
//-------------------------------
//{ pelicula }
function insertFilm(request, response) {
  console.log("insertar film, logica de negocio")
  // aqui hace falta la peli, que viene en el body (en este caso)
  // Somos nosotros los que decidimos si se lee o no
  // con request.on("data", callback)" ordenamos su lectura
  // request.on es una funcion ASINCRONA
  request.on("data", function(bodyContent) {
      let film = JSON.parse(bodyContent)
      filmBussines.insertFilm(film)
  })
}

//PUT /peliculas/:id
//CT: app/json
//-------------------------------
//{ pelicula }
function modifyFilm(request, response) {
  console.log("Modify Film")
  request.on("data", function(bodyContent) {
      let film = JSON.parse(bodyContent)
      filmBussines.modifyFilm(film)
  })
}

//DELETE /peliculas/:id
function deleteFilm(request, response) {
  console.log("Delete Film")
  let id = request.url.split("/").pop()
  filmBussines.deleteFilm(id)
}
