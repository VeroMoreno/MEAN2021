const mongoDB = require("mongoDB")
/*
let promesa = mongoDB.connect("mongodb://localhost:27017", { useUnifiedTopology : true })
promesa.then(function(dbs) {
  console.log(dbs)
})
promesa.catch(function(err) {
  console.log(err)
})
*/

console.log("Conectando con la base de datos...")

let collectionFilm = null
let dbs = null

mongoDB
  .connect("mongodb://localhost:27017", { useUnifiedTopology : true })
  .then(function(dbsAux){
      console.log("Conectado")
      dbs = dbsAux
      let schemaFilms = dbs.db("schemaFilm")
      collectionFilm = schemaFilms.collection("films")
      // Siguiente llamada asincrona. no pasamos callback y devuelve una promesa
      // concatenacion de promesas:
      return collectionFilm.insertOne({ title: "Alien", director: "whoKnows" })
  })
  .then(function(resultOfInsertFilm){
    console.log("pelicula insertada")
    return collectionFilm.findOne({ title: "Alien"})
  })
  .then(function(film){
    console.log("Peli", film)
    return dbs.close()
  })
  .then(function(){
    console.log("desconectado")
  })
  .catch(function(err){
    console.log(err)
  })
  //El bloque finally se ejecuta despues del último then o despues de catch (lo que toque)
  //No haremos ninguna llamada asíncrona dentro del finaly porque el finaly implica que hemos terminado
  .finally(function(){
    console.log("FIN de verdad")
  })
console.log("FIN")
