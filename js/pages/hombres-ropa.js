// JavaScript extraído de pages/hombres-ropa.html

function filterProducts(category, button) {

            const products =
                document.querySelectorAll(".product-card");

            const buttons =
                document.querySelectorAll(".filters button");

            let visible = 0;


            buttons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            products.forEach(product => {

                if (
                    category === "all" ||
                    product.dataset.category === category
                ) {

                    product.style.display = "block";

                    visible++;

                } else {

                    product.style.display = "none";

                }

            });


            document.getElementById("product-count").textContent =
                visible + " productos";

        }

function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('.newsletter-message');
    message.classList.add('show');
    form.reset();
}
