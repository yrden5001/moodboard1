
/* ==========================================
   CARRITO GLOBAL — MOODBOARD
========================================== */

let carrito = JSON.parse(localStorage.getItem("moodboard_carrito")) || [];


/* ==========================================
   GUARDAR CARRITO
========================================== */

function guardarCarrito() {

    localStorage.setItem(
        "moodboard_carrito",
        JSON.stringify(carrito)
    );

}


/* ==========================================
   AGREGAR PRODUCTO
========================================== */

function agregarAlCarrito(nombre, precio, imagen) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            id: Date.now(),

            nombre: nombre,

            precio: Number(precio),

            imagen: imagen,

            cantidad: 1

        });

    }

    guardarCarrito();

    actualizarContador();

    mostrarNotificacion(
        `${nombre} fue agregado al carrito`
    );

}


/* ==========================================
   ELIMINAR PRODUCTO
========================================== */

function eliminarDelCarrito(id) {

    carrito = carrito.filter(
        producto => producto.id !== id
    );

    guardarCarrito();

    renderizarCarrito();

    actualizarContador();

}


/* ==========================================
   CAMBIAR CANTIDAD
========================================== */

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(
        producto => producto.id === id
    );

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarDelCarrito(id);

        return;

    }

    guardarCarrito();

    renderizarCarrito();

    actualizarContador();

}


/* ==========================================
   CONTADOR DEL CARRITO
========================================== */

function actualizarContador() {

    const contador = document.querySelector("#cart-count");

    if (!contador) return;

    const totalProductos = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    contador.textContent = totalProductos;

}


/* ==========================================
   CALCULOS
========================================== */

function calcularSubtotal() {

    return carrito.reduce(
        (total, producto) =>
            total + producto.precio * producto.cantidad,
        0
    );

}

function calcularIGV() {

    return calcularSubtotal() * 0.18;

}

function calcularTotal() {

    return calcularSubtotal() + calcularIGV();

}


/* ==========================================
   FORMATO MONEDA
========================================== */

function soles(valor) {

    return `S/ ${valor.toFixed(2)}`;

}


/* ==========================================
   RENDERIZAR CARRITO
========================================== */

function renderizarCarrito() {

    const contenedor = document.querySelector("#cart-items");

    if (!contenedor) return;

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>Descubre prendas que reflejen tu mood.</p>
                <a href="mujeres-ropa.html" class="primary-btn">
                    Explorar colección →
                </a>
            </div>
        `;

        actualizarResumen();

        return;

    }

    contenedor.innerHTML = carrito.map(producto => `

        <article class="cart-item">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <div class="cart-item-info">

                <p class="cart-category">
                    MOODBOARD / CLOTHING
                </p>

                <h3>${producto.nombre}</h3>

                <p>${soles(producto.precio)}</p>

                <div class="quantity-controls">

                    <button onclick="cambiarCantidad(${producto.id}, -1)">
                        −
                    </button>

                    <span>${producto.cantidad}</span>

                    <button onclick="cambiarCantidad(${producto.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-actions">

                <strong>
                    ${soles(producto.precio * producto.cantidad)}
                </strong>

                <button
                    class="remove-btn"
                    onclick="eliminarDelCarrito(${producto.id})">

                    Eliminar

                </button>

            </div>

        </article>

    `).join("");

    actualizarResumen();

}


/* ==========================================
   RESUMEN DE COMPRA
========================================== */

function actualizarResumen() {

    const subtotal = calcularSubtotal();

    const igv = subtotal * 0.18;

    const total = subtotal + igv;

    const subtotalElement = document.querySelector("#subtotal");

    const igvElement = document.querySelector("#igv");

    const totalElement = document.querySelector("#total");

    if (subtotalElement) {
        subtotalElement.textContent = soles(subtotal);
    }

    if (igvElement) {
        igvElement.textContent = soles(igv);
    }

    if (totalElement) {
        totalElement.textContent = soles(total);
    }

}


/* ==========================================
   NOTIFICACIÓN
========================================== */

function mostrarNotificacion(mensaje) {

    const notificacion = document.createElement("div");

    notificacion.className = "cart-notification";

    notificacion.textContent = mensaje;

    document.body.appendChild(notificacion);

    setTimeout(() => {

        notificacion.remove();

    }, 2500);

}


/* ==========================================
   INICIALIZAR
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    actualizarContador();

    renderizarCarrito();

});