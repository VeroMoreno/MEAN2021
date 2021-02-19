const express = require("express")
const mongoDBUtil = require("./util/mongoDBUtil")
const peliculasRouter = require("./rest/restPeliculas").router

//provisional
// arrancarServidor()
mongoDBUtil.conectar(arrancarServidor)

function arrancarServidor() {
  let app = express()
3
  app.use(peliculasRouter)

  app.listen(5000, function() {
    console.log("Esperando peticiones en el puerto 5000")
  })
}