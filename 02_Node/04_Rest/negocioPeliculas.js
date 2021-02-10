// Sin esta separacion aplicacion / negociopelicula no es modular.. = super JARI
// La logica de negocio debe ser perfectamente ignorante de que estamos tratando con una API REST
// Jamás envieremos aqui el request o el reponse

const mongoDB = require("mongodb")
const mongoDBUtil = require("./mongoDBUtil")

exports.listFilm = function() {
  let collectionFilms = mongoDBUtil.schemaFilm.collection("films")
}

let colectionFilms = null
exports.findFilm = function(idFilm) {
  let collectionFilms = mongoDBUtil.schemaFilm.collection("films")
  // Cuidado que _id tiene como valor ObjectId
  //return collectionFilms.findOne( { _id : idFilm })
  return collectionFilms.findOne( { _id : new mongoDB.ObjectId(idFilm) })
}

/*
exports.insertFilm = function(film) {

}

exports.modifyFilm = function(film) {

}

exports.deleteFilm = function(idFilm) {

}
*/
