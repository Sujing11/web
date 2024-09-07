const apiURL = 'https://talentotech.vercel.app/contacts/';

const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("id")
const nombre = document.getElementById("name")
const correo = document.getElementById("email")
const telefono = document.getElementById("phone")
const mensaje = document.getElementById("message")
const contenedorId = document.getElementById("contenedorId")
const btnModalFooter = document.getElementsByClassName("btn-modal-footer")


function obtener() {

    fetch(apiURL, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            tableBody.innerHTML = result.map(element => `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.phone}</td>
                    <td>${element.message}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetails('${element._id}')">
                            Modificar
                        </button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(error => console.log('error', error));
}

function obtenerPorId(id) {

    fetch(`${apiURL}${id}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            inputId.value = result._id;
            nombre.value = result.name;
            correo.value = result.email;
            telefono.value = result.phone;
            mensaje.value = result.message;
        })
        .catch(error => console.log('error', error));
}

function eliminar() {
    fetch(`${apiURL}${inputId.value}`, { method: 'DELETE' })
        .then(response => window.location.reload())
        .catch(error => console.log('error', error));
}

function actualizar() {
    const updatedData = {
        name: nombre.value,
        email: correo.value,
        phone: telefono.value,
        message: mensaje.value
    };

    console.log('Actualizando contacto con ID:', inputId.value);
    console.log('Datos a actualizar:', updatedData);

    fetch(`${apiURL}${inputId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
        .then(response => window.location.reload())
        .catch(error => console.log('error', error));
}


function crear() {
    const newData = {
        name: nombre.value,
        email: correo.value,
        phone: telefono.value,
        message: mensaje.value
    };

    fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
        .then(response => window.location.reload())
        .catch(error => console.log('error', error));
}

function limpiarInput() {
    inputId.value = '';
    nombre.value = '';
    correo.value = '';
    telefono.value = '';
    mensaje.value = '';
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