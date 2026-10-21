// JavaScript extraído de pages/localizanos.html

function sendContactForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = document.getElementById('contact-success');
    message.classList.add('show');
    form.reset();
}

function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('.newsletter-message');
    message.classList.add('show');
    form.reset();
}
