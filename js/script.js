const apiURL = 'https://talentotech.vercel.app/products/'
//const apiURL = 'http://localhost:3000/products/';

async function getProducts() {
    let products = await fetch(apiURL);
    products = await products.json();
    document.getElementById("product").innerHTML = '';
    products.forEach((product) => {
        const imageUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : 'default-image-url.jpg';
        document.getElementById("product").innerHTML += `
            <div class="card">
                <img src="${imageUrl}" alt="Imagen del producto">
                <div class="card-content">
                    <h5>${product.name}</h5>
                    <h6>$ ${product.price}</h6>
                </div>
                <div class="btn-container">
                                <a href="#" class="btn border border-secondary add-to-cart" onclick="addToCart(event, this)">
                                    <i class="fa fa-shopping-bag me-2"></i>Añadir
                                </a>
                                <div class="quantity-controls d-none">
                                    <button class="btn btn-sm remove-item" onclick="removeItem(event, this)">
                                        <i class="fa fa-minus-circle"></i>
                                    </button>
                                    <span class="quantity">1</span>
                                    <button class="btn btn-sm add-item" onclick="addItem(event, this)">
                                        <i class="fa fa-plus-circle"></i>
                                    </button>
                                </div>
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

// 
function addToCart(event, element) {
    event.preventDefault();
    const btnContainer = element.closest('.btn-container');
    btnContainer.querySelector('.add-to-cart').classList.add('d-none');
    btnContainer.querySelector('.quantity-controls').classList.remove('d-none');
}

function removeItem(event, element) {
    const quantityElement = element.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = --quantity;
    } else {
        const btnContainer = element.closest('.btn-container');
        btnContainer.querySelector('.add-to-cart').classList.remove('d-none');
        btnContainer.querySelector('.quantity-controls').classList.add('d-none');
    }
}

function addItem(event, element) {
    const quantityElement = element.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = ++quantity;
}
