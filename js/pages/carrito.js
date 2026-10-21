// JavaScript extraído de pages/carrito.html

function generarFactura() {

        if (carrito.length === 0) {

            alert("Tu carrito está vacío.");

            return;

        }

        window.location.href = "factura.html";

    }

function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('.newsletter-message');
    message.classList.add('show');
    form.reset();
}
