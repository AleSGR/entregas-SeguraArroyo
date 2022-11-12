// Creación objeto producto
class Producto {
    constructor(id, tipo, nombre, imagen, descripcion, precio, cantidad) {
        this.id = id,
            this.tipo = tipo,
            this.nombre = nombre,
            this.imagen = imagen,
            this.descripcion = descripcion,
            this.precio = precio,
            this.cantidad = cantidad
    }
    subtotal() {
        let subtotalP = (this.precio * this.cantidad)
        console.log(`El subtotal es de ${subtotalP}`)
        subtotales.push(subtotalP)
    }

}

// Lista de productos agregados
let producto1 = new Producto(1, "Caliente", "Americano", "americano.png", "Hecho con café de Oaxaca", 35)
let producto2 = new Producto(2, "Caliente", "Capuchino", "capuchino.png", "Hecho con café de Oaxaca", 55)
let producto3 = new Producto(3, "Caliente", "Moka", "moka.png", "Hecho con café de Oaxaca", 55)
let producto4 = new Producto(4, "Fria", "Frappe Vainilla", "frappeCH.png", "Hecho con vainilla", 75)
let producto5 = new Producto(5, "Fria", "Frappe Chocolate", "frappeVN.png", "Hecho con chocolate abuelita", 75)
let producto6 = new Producto(6, "Fria", "Frappe Fresa", "frappeFR.png", "Hecho con fresa natural", 75)
// Añadirlos al Array
let listaProductos = []
// Añadir al carrito
let notaVenta = []
// Storage de los productos
if(localStorage.getItem("listaProductos")){
    listaProductos=JSON.parse(localStorage.getItem("listaProductos"))
}else{
    // Si entra por primera vez , setea el array original
    console.log("Seteando por primera vez")
    listaProductos.push(producto1,producto2,producto3,producto4,producto5,producto6)
    localStorage.setItem("listaProductos",JSON.stringify(listaProductos))
}
// Storage del carrito
if(localStorage.getItem("notaVentaMesa")){
    notaVenta = JSON.parse(localStorage.getItem("notaVentaMesa"))
}else{
    console.log("Seteando la nota por primera vez")
    localStorage.setItem("notaVentaMesa",JSON.stringify(notaVenta))
}   
// DOM
let btnAgregarProducto = document.getElementById("ingresarNuevoProducto")
let productosEnNota=document.getElementById("productosEnNota")
let productoPlantilla = document.querySelector("#productos")
let buscadorNombre = document.getElementById("buscarPorNombre")


// Finalizar nota y compra del carrito
function finalizarCarrito(lista) {
    lista.forEach(
        (Producto) => (
            console.log(`   Tipo Producto: ${Producto.tipo} 
    Nombre: ${Producto.nombre}
    Precio ${Producto.precio}
    Cantidad: ${Producto.cantidad}`)
        )
    )
}

// Buscador por nombre
function buscarProducto(input,array) {
    let busqueda=array.filter(
        (Producto)=>Producto.nombre.toLowerCase().includes(input.toLowerCase()) 
        || Producto.id == input
    )
    if(busqueda.length==0){
        productoPlantilla.innerHTML =`<p class="textoError">No se encontró ningún producto</p>`
        
    }else{
        mostrarProductos(busqueda)
    }
}
buscadorNombre.addEventListener("input",()=>{buscarProducto(buscadorNombre.value,listaProductos)})


// Menu principal
function menuPrincipal() {
    let opcion = parseInt(prompt(`Menú principal: Elija una acción a realizar:
                                (1) Ingresar nota de venta
                                (2) Buscar productos por tipo de Bebida`))
    menu(opcion)
}
function menu(opcionSeleccionada) {
    switch (opcionSeleccionada) {
        case 1:
            ingresarNota()
            break;
        case 2:
            buscarTipoBebida(listaProductos)

    }
}
// Llamar al Menú
// menuPrincipal()
// menu()





// Agregar producto nuevo al catálogo de productos
function crearProducto(array) {
    let anadirTipoProducto = document.getElementById("anadirTipoProducto")
    let anadirNombreProducto = document.getElementById("anadirNombreProducto")
    let anadirPrecio = document.getElementById("anadirPrecio")
    let anadirDescripcion = document.getElementById("anadirDescripcion")
    let productoCreado = new Producto(array.length+1, anadirTipoProducto.value, anadirNombreProducto.value, "nuevoproducto.png", anadirDescripcion.value, parseInt(anadirPrecio.value), 1)
    array.push(productoCreado)
    console.log(array)
    localStorage.setItem("listaProductos",JSON.stringify(array))
    mostrarProductos()
    anadirTipoProducto.value = ""
    anadirNombreProducto.value = ""
    anadirPrecio.value = ""
    anadirDescripcion.value = ""
    
    // Reinciar formulario
}

btnAgregarProducto.addEventListener("click", () => { crearProducto(listaProductos) })
// Plantilla div producto en el HTML


function mostrarProductos(array){
    productoPlantilla.innerHTML = ""
// Se pone el div con .innerHTML = "" para resetear el div y no se duplique cuando se meten más de 1 producto
    for (let prod of array) {
        let insertarProducto = document.createElement("div")
        insertarProducto.innerHTML = `<article id="${prod.id}"class="card">
                                <button id="btnAgregar${prod.id}" class="btnAdd">
                                <h3 class="tituloCard">${prod.nombre}</h3>
                                <img src="../img/${prod.imagen}" alt="${prod.nombre}">
                                <div class="content">
                                    <p class="descripcionCard">${prod.descripcion}</p>
                                    <p class="precioCard">Precio: ${prod.precio}</p>
                                </div>
                                </button></article>`
        productoPlantilla.appendChild(insertarProducto)
        let btnAgregar=document.getElementById(`btnAgregar${prod.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener('click',()=>{agregarANota(prod)})
    }
} 
// Funcion agregar al carrito
function agregarANota(prod){
    notaVenta.push(prod)
    console.log(notaVenta)
    localStorage.setItem("notaVentaMesa",JSON.stringify(notaVenta))
    mostrarEnNotaVenta(notaVenta)
}
// Imprimir en el HTML
function mostrarEnNotaVenta(array){
    productosEnNota.innerHTML=""
    array.forEach((notaVenta)=>{
        productosEnNota.innerHTML += `
        <article id="${notaVenta.id}"class="itemNota">
            <div class="boxTitulo">
            <p class="itemId">ID: ${notaVenta.id}</p>
            <h3 class="itemTitulo">${notaVenta.nombre}</h3></div>
            <div class="boxPrecio">
            <p class="itemPrecio"> $${notaVenta.precio}</p></div>
        </article>`
    }
    // El For each casi no toma en cuenta lo que este aqui afuera
    )
}

// Botón borrar catálogo
mostrarProductos(listaProductos)
let btnOcultarCatalogo=document.getElementById("borrarCatalogo")
btnOcultarCatalogo.onClick=()=>{productoPlantilla.innerHTML=""}

// Funcion imprimir en el modal
// Funcion subtotal

