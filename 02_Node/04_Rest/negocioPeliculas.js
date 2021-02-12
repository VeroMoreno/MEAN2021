// Sin esta separacion aplicacion / negociopelicula no es modular.. = super JARI
// La logica de negocio debe ser perfectamente ignorante de que estamos tratando con una API REST
// Jamás envieremos aqui el request o el reponse

const ObjectId = require("mongodb").ObjectId
const mongoDBUtil = require("./mongoDBUtil")

exports.listFilm = function() {
  let collectionFilms = mongoDBUtil.schemaFilm.collection("films")
  // find es asincrona
  let cursor = collectionFilms.find()
  // Cuando empecemos a recorrer el cursos entonces si que sera una funcion asincrona
  // toArray recorre el cursor y crea un array con todos los objetos
  return cursor.toArray()
}

let colectionFilms = null
exports.findFilm = function(idFilm) {
  let collectionFilms = mongoDBUtil.schemaFilm.collection("films")
  // Cuidado que _id tiene como valor ObjectId
  //return collectionFilms.findOne( { _id : idFilm })
  return collectionFilms.findOne({ _id : new ObjectId(idFilm) })
}


exports.insertFilm = function(film) {
  // validar si la película es correcta
  let collectionFilms = mongoDBUtil.schemaFilm.collection("films")
  return collectionFilms.insertOne(film)
}


exports.modifyFilm = function(film) {
  // validar pelicula
  return mongoDBUtil
  .schemaFilm
  .collection("films")
  //.updateOne( { _id : new ObjectId(pelicula._id) },
  //findOneAndUpdate incluye en el objeto 'commandResult' el documento que había antes en la colección
  //Si queremos que devuelva el objeto tal cual ha quedado hay que añadir un parámetro extra a la consulta
  .findOneAndUpdate({ _id : new ObjectId(film._id) },
            {
              /*
              Le asignamos estas props al documento
              si el documento ya las tiene, se cambiará el valor
              si el documento no las tiene se las añade
              */
              $set : {
                title     : film.title,
                director  : film.director,
                gender    : film.gender,
                year      : film.year,
                snopsis   : film.sinopsis
              }
            }
            ,
            {
                returnOriginal : false,
                //Con la opcion upsert a true si el criterio de búsqueda no ha dado
                //resultado se insertará un nuevo documento con los valores disponibles
                //Es decir, convertimos la consulta en un 'modificar o insertar'
                //upsert : true
            })
}

exports.deleteFilm = function(idFilm) {
  return mongoDBUtil
  .schemaFilm
  .collection("films")
  .deleteOne( { _id : new ObjectId(idFilm) } )
}
