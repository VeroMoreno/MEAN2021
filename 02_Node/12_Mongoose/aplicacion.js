//npm install mongoose
const { ObjectID } = require("bson")
let mongoose = require("mongoose")

//Le proporcionaremos a Mongoose una url a la base de datos que incluya el esquema
let url = "mongodb://localhost:27017/tienda"

console.log("Conectando con la base de datos...")
mongoose
    .connect( url, { useNewUrlParser:true, useUnifiedTopology:true })
    .then( () => {
        console.log("Conectado!")
        // 1.
        let esquemaUsuarios = new mongoose.Schema({
            _id       : ObjectID,
            login     : String,
            pw        : String,
            rol       : String,
            nombre    : String,
            direccion : String,
            telefono  : String,
            correoe   : String,
            idioma    : String,
        })

        // 2. CREAR MODELO
        // Le pedimos a mongoose que nos cree un prototipo basado en el esquema.
        let Usuario = mongoose.model("usuarios", esquemaUsuarios)
        // A partir de aqui cada vez que necesitemos un usuario hacemos el new del prototipo.
        let usuario = new Usuario()
        // de momento solo tiene valor en _id
        console.log(usuario)

        // El prototipo define unas cuantas funciones que manejaremos a futuro
        for(let propiedad in usuario) {
            console.log(propiedad)
        }

        usuario.login = "veronica"
        usuario.pw    = "veronica"
        usuario.nombre = "Veronica"
        usuario.direccion = "C/ Montañas de tierra y fuego"

        // 3. INSERTAR UN DOCUMENTO
        //Esto es asincrono.
        //return usuario.save(usuario)
    })
    .then((usuarioInsertado) => {
        console.log("Insertado: ", usuarioInsertado)
        // Tambien podemos proporcionar un objeto normal cuando hacemos "new"
        let usrNormalYCorriente = {
            login     : 'erpepe',
            pw        : 'erpepe',
            direccion : 'Venus',
            nombre    : 'Pepe',
        }
        let usuario2 = new Usuario(usrNormalYCorriente)
        return usuario2.save()
    })
    .then( () => {
        console.log("Desconectando...")
        return mongoose.disconnect()
    })
    .then(() => {
        console.log("Desconectado!")
        console.log("FIN")
    })
    .catch( error => console.log(error) )

