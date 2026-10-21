// JavaScript extraído de pages/hombres-accesorios.html

function filterProducts(category, button) {

            const products = document.querySelectorAll(".product-card");
            const buttons = document.querySelectorAll(".filter-btn");

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            products.forEach(product => {

                if (category === "all" || product.dataset.category === category) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }

            });

        }

function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('.newsletter-message');
    message.classList.add('show');
    form.reset();
}
