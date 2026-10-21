// JavaScript extraído de pages/factura.html

function cargarFactura() {

            const invoiceItems = document.getElementById("invoice-items");

            if (carrito.length === 0) {
                invoiceItems.innerHTML = `
                    <tr>
                        <td colspan="4">
                            No hay productos en esta factura.
                        </td>
                    </tr>
                `;
                return;
            }

            carrito.forEach(producto => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${soles(producto.precio)}</td>
                    <td>${soles(producto.precio * producto.cantidad)}</td>
                `;

                invoiceItems.appendChild(row);

            });

            document.getElementById("invoice-subtotal").textContent =
                soles(calcularSubtotal());

            document.getElementById("invoice-igv").textContent =
                soles(calcularIGV());

            document.getElementById("invoice-total").textContent =
                soles(calcularTotal());
        }

        document.getElementById("invoice-date").textContent =
            new Date().toLocaleDateString("es-PE");

        cargarFactura();

function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('.newsletter-message');
    message.classList.add('show');
    form.reset();
}
