const mongoDB = require("mongoDB")

// Este valor deberia estar en un fichero de configuracion
url = "mongodb://localhost:27017"

exports.schemaFilm = null

// Exportamos esta funcion para invocarla desde aplicacion.js al iniciar
exports.conectar = function(callback) {
  console.log("conectando a la base de datos...")
  mongoDB
  .connect(url, { useUnifiedTopology : true })
  .then(function(dbs){
    console.log("conexion establecida")
    // aqui nos hace falta exports.schemafilms
    exports.schemaFilm = dbs.db("schemaFilm")
    // Invocamos un callback
    /* if(typeof callback != "function") {
      console.log("tienes que pasar una funcion")
    } */
    callback()
  })
  .catch(function(err){
    console.log("No se pudo conectar con la base de datos")
    console.log(err)
  })
}

