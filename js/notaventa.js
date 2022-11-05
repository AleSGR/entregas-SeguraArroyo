class Producto {
    constructor(id, tipo, nombre, imagen, descripcion, precio, cantidad) {
        this.id = id,
            this.tipo = tipo,
            this.nombre = nombre,
            this.imagen = imagen,
            this.descripcion = descripcion
        this.precio = precio,
            this.cantidad = cantidad
    }
    subtotal() {
        let subtotalP = (this.precio * this.cantidad)
        console.log(`El subtotal es de ${subtotalP}`)
        subtotales.push(subtotalP)
    }

}
let producto1 = new Producto(1, "Caliente", "Americano", "americano.png", "Hecho con café de Oaxaca", 35)
let producto2 = new Producto(2, "Caliente", "Capuchino", "capuchino.png", "Hecho con café de Oaxaca", 55)
let producto3 = new Producto(3, "Caliente", "Moka", "moka.png", "Hecho con café de Oaxaca", 55)
let producto4 = new Producto(4, "Fria", "Frappe Vainilla", "frappeCH.png", "Hecho con vainilla", 75)
let producto5 = new Producto(5, "Fria", "Frappe Chocolate", "frappeVN.png", "Hecho con chocolate abuelita", 75)
let producto6 = new Producto(6, "Fria", "Frappe Fresa", "frappeFR.png", "Hecho con fresa natural", 75)

const listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6]
console.log(listaProductos)
const subtotales = []
const carrito = []

function buscarId(array){
    let IdBuscado=prompt("Ingrese el nombre del personaje a buscar")
    let IdEncontrado= array.find(
        (Producto)=>(Producto.id == IdBuscado)
        )
    if(IdEncontrado==undefined){
        console.log("El id buscado no se encuentra en la base de datos")
    }else{
        console.log(IdEncontrado.id)
    }

// El if con el else se aplican para dar los resultados, solo es un ejemplo de su uso, no es necesario a fuerzas
}

function addProducto(idSeleccion){
    Producto.id
    console.log(idSeleccion)  
    // let mesaActual=[]
    // let productoSeleccion=seleccion
    // mesaActual.push(productoSeleccion)
}

let productosPlantilla = document.querySelector("#productos")
function mostrarProductos(){
    productosPlantilla.innerHTML = ""
    for (let prod of listaProductos) {
        let selecProducto = document.createElement("button")
        selecProducto.className = "producto"
        selecProducto.innerHTML = `<article id="${prod.id}"class="card">
                                <h3 class="tituloCard">${prod.nombre}</h3>
                                <img src="../imagenes/${prod.imagen}" alt="${prod.nombre}">
                                <div class="content">
                                    <p class="descripcionCard">${prod.descripcion}</p>
                                    <p class="precioCard">Precio: ${prod.precio}</p>
                                </div>
                             </article>`
        productosPlantilla.appendChild(selecProducto)
        }
    for (prod of listaProductos) {
    btnAddProducto=document.querySelector(".producto")
    btnAddProducto.addEventListener("click",()=>{buscarId(listaProductos)})
    }
}
mostrarProductos()
