let contenedorProductos = document.getElementById(`mis-productos`)

const contenedorCarrito = document.getElementById(`llenar-carrito`)

const botonVaciar = document.getElementById(`vaciar-carrito`)
const contadorCarrito = document.getElementById(`contadorCarrito`)

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()

botonVaciar.addEventListener(`click`, () =>{
carrito.length = 0
actualizarCarrito ()
})

misProductos.forEach((producto) => {  
   const div = document.createElement(`div`)    
    div.classList.add(`producto`)               
    div.innerHTML = `
    <img src=${producto.img} alt="">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio : $ ${producto.precio}</p>                       
    <button id="agregar ${producto.id}" class="boton-carrito">Agregar al carrito<i class="fas fa-shooping-card></i></button> 
  `
  contenedorProductos.appendChild(div)

  const boton = document.getElementById(`agregar ${producto.id}`)

  boton.addEventListener(`click`, () => {
    agregarAlCarrito(producto.id)
  })
})
const agregarAlCarrito = (prodId) => {
 
 const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
            // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
        const item = misProductos.find((prod) => prod.id === prodId)//Trabajamos con las ID
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        carrito.push(item)
    }
 actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
}
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice,1)
  actualizarCarrito()
}

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado
    //3 - TERCER PASO. AGREGAR AL MODAL. Recorremos sobre el array de carrito.

    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))
  contadorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio,0)

    }