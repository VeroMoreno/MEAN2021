/* npm install -g typscript
Escribimos en la consola tsc y ejecutamos para saber que se ha instalado bien

- Lenguaje creado por Microsoft
- Super conjunto de Javascript (Pregunta de examen)
- No permite hacer nada que no permita Javascript
- Orientado a objetos con CLASES
- Con definicion de tipos opcionales
- Con modificadores de acceso
- Con herencia
- Con interfaces
- No se compila
- No se ejecuta
- No se transpila
- Se transpila a JS y eso se lo que se interpreta en un motor JS

// VARIABLES
- En typescript las variables pueden tener un tipo opcional
- Es obligatorio declarar (con var, let o const)

// VARIABLES CON TIPO
- var, let, const nombre_variable:TIPO = valor
*/

let numero:number   = 5
let texto:string    = "Verónica"
let activo:boolean  = true

console.log(numero);

/* ANY
- Es igual a declarar la variable sin indicar el tipo */
let whatever:any
whatever = 5
whatever = true
whatever = "Lo que sea"

/* ARRAY
- */

// Aqui declaramos una variable del tipo array, pero no está inicializada
let array1: []
// Aqui declaramos una variable tipo array y le asignamos como valor un array vacio.
let array2: [] = [] // osea que siempre asi mejor.

// Arrays tipados
//let numeros :number[] //Array que solo puede guardar números
//let palabras:string[] //Array que solo puede guardar cadenas de texto
//Que no se nos olvide inicializar los arrays!
let numeros:number[] = []
let palabras:string[] = []
palabras.push("UÉ!")
numeros.push(1)

//
//Funciones
//

//Podemos escribir las funciones como si estuvieramos en JS
function sumar(s1, s2, s3){
  console.log(s1+s2+s3)
}
console.log( sumar(10,20,30) )       //60
console.log( sumar("10","20","30") ) //102030
console.log( sumar(10,20,"30") )     //3030
console.log( sumar("10",20,30) )     //102030


//Definiendo los tipos en los parámetros
function multiplicar(n1:number, n2:number){
  console.log(n1*n2)
}

multiplicar(25,10)
//multiplicar("hola",true) //No transpila!

//Definiendo el tipo del valor devuelto
function restar(n1:number,n2:number):number{
  return n1-n2
}

let resultado:number //undefined
resultado = restar(100,10)

let resultado2:boolean
//resultado2 = restar(100,10) //No transpila

//Disponemos del tipo especial 'void' para las funciones que no devuelven nada
//Su uso es opcional
function saludar(nombre:string):void{
  console.log("Hola "+nombre)
}

saludar("Luis Ramón")

//Aqui el transpilador debería quejarse, pero no lo hace
let historia = saludar("abcdefg")

//
//En typeScript perdemos 'las llamadas con distinto número de parámetros'
//
function dividir(n1:number, n2:number):void{
  console.log(n1/n2)
}

//dividir(1)     //No transpila
dividir(1,2)
//dividir(1,2,3) //No transpila

//Si necesitamos parámetros variables los declaramos explícitamente como tales
//Declaramos el parámetro variable con los tres puntos
//Solo puede haber un parámetro variable
//Y tiene que ser el último
function sumarNumeros(...numeros:number[]):number{
  let total:number = 0
  //TypeScript no deja declarar los tipos un un bucle
  for(let numero of numeros){
      total += numero
  }
  return total
}

console.log( sumarNumeros() )
console.log( sumarNumeros(1) )
console.log( sumarNumeros(1,2) )
console.log( sumarNumeros(1,2,3) )
console.log( sumarNumeros(1,2,3,4) )