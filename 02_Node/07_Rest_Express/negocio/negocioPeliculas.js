/* LO QUE HABIA ANTES ERAN LAS PROMESAS QUE DEVOLVIA EXPRESS / NODE (negocioPeliculas.js de 04_rest)
Lo que vamos a ver ahora son nuestras propias promesas personalizadas (resolve, reject)
Las promesas personalizadas las necesitamos para que el en 'then' solo haya casos de exito
    .then(function(peliculas){

    })
    .catch(function(err){

    })
*/

const ObjectId = require("mongodb").ObjectId
const mongoDBUtil = require("../util/mongoDBUtil")

exports.listarPeliculas = function(){
    // Cuando creamos una promesa debemos proporcionarle una funcion dentro de la cual estara el codigo que se va a ejecutar. 
    // Esa funcion recibe por parámetros otras dos :)
    return new Promise(function(resolve, reject) {
        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        let cursor = coleccionPeliculas.find()
        return cursor
            .toArray()
            .then(function(peliculas){
                resolve(peliculas)
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo: 500 , mensaje: "Error al ejecutar la consulta"})
            })
    })
}

exports.buscarPelicula = function(idPelicula){
    return new Promise(function(resolve, reject) {
        let coleccionPeliculas = mongoDBUtil.esquemaPeliculas.collection("peliculas")
        coleccionPeliculas
            .findOne( { _id : new ObjectId(idPelicula) })
            .then(function(pelicula){
                if  (!pelicula) {
                    reject({ codigo: 404, mensaje: "No existe una pelicula con el id " + idPelicula })
                    return
                }
                resolve(pelicula)
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo: 500 , mensaje: "Error al ejecutar la consulta"})
            })
    })
}

exports.insertarPelicula = function(pelicula){
    return new Promise(function(resolve, reject) {
        console.log("insertar pelicula", pelicula)
        // VALIDAR...

        // QUITARLE EL ID A LA PELICULA para que no puedan decidir su valor desde fuera de la lógica de negocio.
        // Si no lo quitamos desde fuera del servidor se podria decidir el valor de los id.
        delete pelicula._id

        mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .insertOne( pelicula )
        .then(function(pelicula){
            // hemos cambiado el .ops[0] de restpeliculas aqui! OLE
            resolve(pelicula.ops[0])
        })
        .catch(function(err){
            console.log(err)
            reject({ codigo: 500 , mensaje: "Error en la base de datos"})
        })
    })
}

exports.modificarPelicula = function(pelicula){
    //Validar la película
    return new Promise(function(resolve, reject) {
        mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .findOneAndUpdate( 
                    { _id : new ObjectId(pelicula._id) },
                    {
                        $set : {
                            titulo   : pelicula.titulo,
                            director : pelicula.director,
                            genero   : pelicula.genero,
                            year     : pelicula.year,
                            sinopsis : pelicula.sinopsis,
                        }
                    },
                    {
                        returnOriginal : false,
                    })
                    .then(function(pelicula){
                        console.log(pelicula);
                        if  (!pelicula.value) {
                            reject({ codigo: 404, mensaje: "No existe una pelicula con el id " + pelicula._id })
                            return
                        }
                        resolve(pelicula.value)
                    })
                    .catch(function(err){
                        console.log(err)
                        reject({ codigo: 500 , mensaje: "Error en la base de datos"})
                    })
    })
}

exports.borrarPelicula = function(idPelicula){
    return new Promise(function(resolve, reject) {
        mongoDBUtil
        .esquemaPeliculas
        .collection("peliculas")
        .deleteOne( { _id : new ObjectId(idPelicula) } )
        .then(function(pelicula){
            if(pelicula.deletedCount == 0) {
                reject({ codigo: 404, mensaje: "no existe una pelicula con ese id para borrar"})
                return
            }
            resolve(pelicula)
        })
        .catch(function(err){
            console.log(err)
            reject({ codigo: 500 , mensaje: "Error en la base de datos"})
        })
    })
}
