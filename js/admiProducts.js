const apiURL = 'https://talentotech.vercel.app/products/';
//const apiURL = 'http://localhost:3000/products/';


const nombre = document.getElementById("name")
const referencia = document.getElementById("sku")
const precio = document.getElementById("price")
const descripcion = document.getElementById("description")
const imagen = document.getElementById("imageURL")
const nombreImagen = document.getElementById("imageName")
const disponible = document.getElementById("isAvailable")
const contenedorId = document.getElementById("contenedorId")
const btnModalFooter = document.getElementsByClassName("btn-modal-footer")


async function obtener() {
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
                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal"onclick="btnDetails('${product._id}')">Detalles</button>
            </div>
        `;
    });
}

function obtenerPorId(id) {
    fetch(`${apiURL}${id}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById("id").value = result._id;
            nombre.value = result.name;
            referencia.value = result.sku;
            precio.value = result.price;
            descripcion.value = result.description;
            imagen.value = result.imagenes && result.imagenes.length > 0 ? result.imagenes[0].url : '';
            nombreImagen.value = result.imagenes && result.imagenes.length > 0 ? result.imagenes[0].name : '';
            disponible.checked = result.isAvailable; 
        })
        .catch(error => console.log('error', error));
}

function eliminar() {
    const id = document.getElementById("id").value;

    if (!id) {
        alert('No se ha seleccionado un producto para eliminar.');
        return;
    }

    fetch(`${apiURL}${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Producto eliminado con éxito!');
                window.location.reload();
            } else {
                alert('Error al eliminar el producto.');
            }
        })
        .catch(error => {
            console.log('Error:', error);
            alert('Hubo un problema con la solicitud.');
        });
}


function actualizar() {
    const id = document.getElementById("id").value;

    if (!id) {
        alert('No se ha seleccionado un producto para actualizar.');
        return;
    }

    const updatedData = {
        name: nombre.value,
        sku: referencia.value,
        price: parseFloat(precio.value),
        description: descripcion.value,
        imagenes: [
            {
                url: imagen.value,
                name: nombreImagen.value
            }
        ],
        isAvailable: disponible.checked
    };

    console.log('Actualizando producto con ID:', id);
    console.log('Datos a actualizar:', updatedData);

    fetch(`${apiURL}${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (response.ok) {
            alert('Producto actualizado con éxito!');
            window.location.reload();
        } else {
            alert('Error al actualizar el producto.');
        }
    })
    .catch(error => {
        console.log('Error:', error);
        alert('Hubo un problema con la solicitud.');
    });
}

async function crear() {
    const form = document.getElementById("create");

    const productData = {
        name: form.name.value,
        sku: form.sku.value,
        price: parseFloat(form.price.value),
        description: form.description.value,
        imagenes: [
            {
                url: form.imageURL.value,
                name: form.imageName.value
            }
        ],
        isAvailable: form.isAvailable.checked
    };

    let message = await fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });
    
    message = await message.json();
    console.log(message);

    form.reset();

    document.getElementById("product").innerHTML = "";

    obtener();
}


function limpiarInput() {
    inputId.value = '';
    nombre.value = '';
    referencia.value = '';
    precio.value = '';
    descripcion.value = '';
    imagen.value = '';
    nombreImagen.value = '';
    disponible.value = '';
}

function btnAdd() {
    btnModalFooter[0].style.display = "block";
    btnModalFooter[1].style.display = "none";
    btnModalFooter[2].style.display = "none";
    contenedorId.style.display = "none";
    limpiarInput();
}

function btnDetails(id) {
    btnModalFooter[0].style.display = "none";
    btnModalFooter[1].style.display = "block";
    btnModalFooter[2].style.display = "block";
    contenedorId.style.display = "block";
    obtenerPorId(id);
}

obtener();