const apiURL = 'https://talentotech.vercel.app/products/'

async function getProducts() {
    let products = await fetch(apiURL);
    products = await products.json();
    products.forEach((product) => {
        const imageUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : 'default-image-url.jpg';
        document.getElementById("product").innerHTML += `
              <div class="card">
                <img src="${imageUrl}" alt="Imagen del producto" style="">
                <div class="card-content">
                <h2>${product.name}</h2>
                <h3>$ ${product.price}</h3>
                <p>Ref: ${product.sku}</p>
                <p>${product.description}</p>
                <p>${product.isAvailable ? 'Disponible' : 'Agotado'}</p>
                 </div>
            </div>
        `;
    });
}

async function createProduct() {
    const form = document.getElementById("create");
    const formData = new FormData(form);

    // Convertir el valor del checkbox a "true" o "false"
    const isAvailable = form.isAvailable.checked ? "true" : "false";
    formData.set("isAvailable", isAvailable);

    const data = new URLSearchParams(formData).toString();

    let message = await fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
    });
    message = await message.json();
    console.log(message);


    form.reset();

    // Actualizar la lista de productos
    document.getElementById("product").innerHTML = "";  // Limpiar el contenido actual
    getProducts();  // Volver a cargar la lista de productos
}