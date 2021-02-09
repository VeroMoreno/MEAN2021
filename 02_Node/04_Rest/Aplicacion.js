// API REST

const http = require("http")
const filmBussines = require("./negocioPeliculas.js")

/* MÉTODO	URL			        BODY	FUNCIONALIDAD
------------------------------------------------------------------
GET	    /peliculas		    -	    listar las pelicula
GET	    /peliculas/{id}  	-	    buscar una pelicula por su id
POST	/peliculas		    {json}	insertar la pelicula
PUT 	/peliculas/{id}  	{json}  modificar la pelicula
DELETE  /peliculas/{id}  	-	    borrar una pelicula
*/

http.createServer(processRequest)
.listen(3000, function() {
    console.log("Esperando peticiones en el puerto 3000")
})

// En esta funcion haremos un triaje de la peticion recibida.
// ESTA FUNCION SOLO HACE UNA COSA, QUIEN HACE EL REQUEST.
function processRequest(request, response) {
  let method = request.method.toUpperCase();
  let url    = request.url
  // && - Si la primera condicion no se cumple, no entra en la segunda
  if( metodo=="GET" && url=="/peliculas"){
      listFilm(request, response)
  } else if( metodo=="GET" && url.match("^/peliculas/[0-9]+$") ) {
      findFilm(request, response)
  } else if( metodo="POST" && url=="/peliculas"){
      insertFilm(request, response)
  } else if( metodo="PUT" && url.match("^/peliculas/[0-9]+$") ){
      modifyFilm(request, response)
  } else if( metodo="DELETE" && url.match("^/peliculas/[0-9]+$") ){
      deleteFilm(request, response)
  } else {
      //404
  }
}

//                                                              //
//Tareas a realizar por la lógica de control en un servicio REST//
//                                                              //

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

//GET /peliculas
function listFilm(request, response) {
  // aqui hace falta un criterio de busqueda
  filmBussines.listFilm()
  console.log("Listing films")
}

//GET /peliculas/:id
function findFilm(request, response) {
  // aqui hace falta el ID de la peli
  let id = request.url.split("/").pop()
  filmBussines.findFilm(id)
  console.log("Find films")
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
      response.end()
  })
  console.log("Insert Film")
}

//PUT /peliculas/:id
//CT: app/json
//-------------------------------
//{ pelicula }
function modifyFilm(request, response) {
  // Aqui hace falta el ID de la pelicula
  request.on("data", function(bodyContent) {
    let film = JSON.parse(bodyContent)
    filmBussines.modifyFilm(film)
    response.end()
})
  console.log("Modify Film")
}

//DELETE /peliculas/:id
function deleteFilm(request, response) {
  // Aqui hace falta el ID de la pelicula
  let id = request.url.split("/").pop()
  filmBussines.deleteFilm(id)
  console.log("Delete Film")
}
