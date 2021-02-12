// Sin esta separacion aplicacion / negociopelicula no es modular.. = super JARI
// La logica de negocio debe ser perfectamente ignorante de que estamos tratando con una API REST
// Jamás envieremos aqui el request o el reponse

const ObjectId = require("mongodb").ObjectId
const mongoDBUtil = require("./mongoDBUtil")

exports.listFilm = function() {
  let collectionFilms = mongoDBUtil.schemaFilm.collection("films")
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
  // updateOne es una funcion asincrona.
  .updateOne({ _id : new ObjectId(film._id) },
            {
              $set : {
                titulo    : film.title,
                director  : film.director,
                gender    : film.gender,
                year      : film.year,
                snopsis   : film.sinopsis
              }
              // segundo parámetro
            })
}

exports.deleteFilm = function(idFilm) {
  return mongoDBUtil
  .esquemaPeliculas
  .collection("films")
  .deleteOne( { _id : new ObjectId(idFilm) } )
}
