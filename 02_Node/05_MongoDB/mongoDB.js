// npm i mongodb
const mongoDB = require("mongoDB")

/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-connect
//-insert
//-findOne
//
//Funciones síncronas
//-dbs.db(nombre_esquema) (obtiene un esquema)

//////////////////////////////////
//Obtener una conexión a MongoDB//
//////////////////////////////////

/* Pasos:
- Conectar y obtener el objeto que representa al servidor de bases de datos (dbs)
- a dbs le pedimos el esquema
- al esquema le pedimos la coleccion
- a la coleccion le pedimos que busque, inserte, modifique...
*/

let url = "mongodb://localhost:27017"
// let url = "direccion que te da atlas" // de momento seguiremos con localhost

// La funcion connect es ASINCRONA
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

  //////////////
  ///insertOne//
  //////////////

  collectionFilm.insertOne({ title : "Soy lo más", director: "Ridley Scott"}, function(err, result){
    if (err) {
      console.log(err)
      return
    }
    console.log("Film inserted")

        collectionFilm.findOne({ title: "Soy lo más"}, function(err, film){
          if (err) {
            console.log(err)
            return
          }
          console.log("Film: ", film)
            // es asincrono y le tengo que pasar un callback
            dbs.close(function(err) {
              if (err) {
                console.log(err)
                return
              }
              console.log("Disconect...")
            })
        })
    })
})