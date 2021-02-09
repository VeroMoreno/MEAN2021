// npm i mongodb
const mongoDB = require("mongoDB")

let url = "mongodb://localhost:27017"
// La funcion connect es asincrona
// nos dan un objeto que representa al servidor de bases de datos
mongoDB.connect(url, { useUnifiedTopology : true }, function(err, dbs){
  if (err) {
    console.log("este es el error: ", err)
    return
  }
  console.log("conexion establecida")
  // al objeto dbs le pedimos el esquema que necesitamos
  let schemaFilm = dbs.db("schemaFilm")
  // Al esquema le pedimos la coleccion que vamos a utilizar
  let collectionFilm = schemaFilm.collection("films")
  // A la coleccion le pedimos que ejecute consultas
  collectionFilm
    .insertOne({ title : "Soy lo más", director: "Ridley Scott"},
    function(err, result){
        if (err) {
          console.log(err)
          return
        }
        console.log("Film inserted")
        console.log(result)
    })
})