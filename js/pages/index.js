// JavaScript extraído de index.html

function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('.newsletter-message');
    message.classList.add('show');
    form.reset();
}
