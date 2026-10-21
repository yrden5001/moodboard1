// JavaScript extraído de pages/outlet.html

function filterOutlet(category, button) {

            const products = document.querySelectorAll(".outlet-card");

            const buttons = document.querySelectorAll(".outlet-filter");

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            products.forEach(product => {

                const productCategory = product.dataset.category;

                if (
                    category === "todos" ||
                    productCategory === category
                ) {
                    product.classList.remove("hidden");
                } else {
                    product.classList.add("hidden");
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
