const apiURL = 'https://talentotech.vercel.app/products/'

async function getProducts() {
    let products = await fetch(apiURL);
    products = await products.json();
    products.forEach((product) => {
        const imageUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : 'default-image-url.jpg';
        document.getElementById("product").innerHTML += `
            <div class="card">
                <img src="${imageUrl}" alt="Imagen del producto">
                <div class="card-content">
                    <h5>${product.name}</h5>
                    <h6>$ ${product.price}</h6>
                    <p>Ref: ${product.sku}</p>
                    <p>${product.description}</p>
                    <p>${product.isAvailable ? 'Disponible' : 'Agotado'}</p>
                </div>
            </div>
        `;
    });
}


// FORMULARIO CONTACTO
async function crear() {
    const form = document.getElementById("create");

    const contactData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
    };

    let contact = await fetch('https://talentotech.vercel.app/contacts/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    });

    contact = await contact.json();
    console.log(contact);

    form.reset();

}

getProducts();

// Back to top button
(function ($) {
    "use strict";

   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);