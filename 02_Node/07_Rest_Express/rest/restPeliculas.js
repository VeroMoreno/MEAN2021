const express = require("express")
const negocioPeliculas = require("../negocio/negocioPeliculas")

let router = express.Router()

//API REST para las peliculas
/*
MÉTODO	URL			        BODY	FUNCIONALIDAD
-------------------------------------------------------------------
GET	    /peliculas		    -	    listar las películas
GET	    /peliculas/:id  	-	    buscar a una película por su id
POST	/peliculas		    {json}	insertar la película
PUT 	/peliculas/:id  	{json}  modificar la película
DELETE  /peliculas/:id  	-	    borrar una película
*/
router.get("/peliculas", listarPeliculas)
router.get("/peliculas/:id", buscarPelicula)
router.post("/peliculas", insertarPelicula)
router.put("/peliculas/:id", modificarPelicula)
router.delete("/peliculas/:id", borrarPelicula)

//EXPORTAMOS EL ROUTER
exports.router = router

/* TAREAS DE LA LÓGICA DE CONTROL DE UN API REST
    1. Extraer de la peticion la informacion necesaria
    2. Convertir esa informacion en algo que entienda la lógica de negocio
    3. Invocar la función de la lógica de negocio
    4. Si la lógic de negocio devuelve algo que le haga falta al cliente transformar al formate adecuado y proporcionar la respuesta.
*/


function listarPeliculas(request, response){
    console.log("Listar películas")
    //Aqui haría falta un criterio de búsqueda (lo ignoramos)
    negocioPeliculas
        .listarPeliculas()
        .then(function(peliculas){
            // response.setHeader('Content-Type', 'application/json')
            // response.end(JSON.stringify(peliculas))
            response.json(peliculas)
        })
        .catch(function(err){
            console.log(err)
            // restUtil.devolverError(response, 500, "Error al listar las películas")
           // Esta respuesta viene de negocio peliculas reject.
            response.statusCode = err.codigo
            response.json(err)
        })
}

//GET /peliculas/:id
function buscarPelicula(request, response){
    console.log("Buscar película")
    let id = request.params.id
    negocioPeliculas
        .buscarPelicula(id)
        .then(function(pelicula){
            /* if(!pelicula){
                restUtil.devolverError(response, 404, "La película solicitada no existe")
                return
            } */
            response.json(pelicula)
        })
        .catch(function(err){
            response.statusCode = err.codigo
            response.json(err)
        })
}

//POST /peliculas
//CT: app/json
//-------------------------------
function insertarPelicula(request, response){
    console.log("Insertar película (LC)")
    // Express solo leerá el body si hemos dado de alta el jsonBodyParser y además en la petición viene el header "cntent-type:application/json"
    let pelicula = request.body
    negocioPeliculas
        .insertarPelicula(pelicula)
        .then( function(peliculaInsertada){
            response.statusCode = 201
            response.json(peliculaInsertada)
        })
        .catch(function(err){
            response.statusCode = err.codigo
            response.json(err)
        })
}

//PUT /peliculas/:id
//CT: app/json
function modificarPelicula(request, response){
    console.log("Modificar película (LC)")
    // let id = request.url.split("/").pop()
    let id = request.params.id
    let pelicula = request.body
        //Nos aseguramos de que la película que venía en el body tenga el id
        //que venía en la ruta
        pelicula._id = id
        negocioPeliculas
        .modificarPelicula(pelicula)
        .then(function(peliculaModificada){
                response.json(peliculaModificada)
            })
        .catch(function(err){
            response.statusCode = err.codigo
            response.json(err)
        })
}

//DELETE /peliculas/:id
function borrarPelicula(request, response){
    console.log("Borrar película (LC)")
    //aqui hace falta el id de la pelicula
    let id = request.params.id
    negocioPeliculas
        .borrarPelicula(id)
        .then(function(){
            //if 404
            response.end("OK")
        })
        .catch(function(err){
            response.statusCode = err.codigo
            response.json(err)
        })
}









