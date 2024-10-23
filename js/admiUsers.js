//const apiURL = 'https://talentotech.vercel.app/users/';
const apiURL = 'http://localhost:3000/users/';

const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("id")
const nombre = document.getElementById("name")
const apellido = document.getElementById("lastName")
const correo = document.getElementById("email")
const contraseña = document.getElementById("password")
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
                    <td>${element.lastName}</td>
                    <td>${element.email}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetails('${element._id}')">
                            Detalles
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
            apellido.value = result.lastName;
            correo.value = result.email;
            contraseña.value = result.password;
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
        lastName: apellido.value,
        email: correo.value,
        password: contraseña.value
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
        lastName: apellido.value,
        email: correo.value,
        password: contraseña.value
    };

    fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (response.ok) {
                alert('Usuario registrado con éxito');
                window.location.reload();
            } else {
                alert('Hubo un problema al registrar el usuario');
            }
        })
        .catch(error => {
            console.log('error', error);
            alert('Ocurrió un error al registrar el usuario');
        });
}

function limpiarInput() {
    inputId.value = '';
    nombre.value = '';
    apellido.value = '';
    correo.value = '';
    contraseña.value = '';
}

function btnAdd() {
    btnModalFooter[0].style.display = "block";
    btnModalFooter[1].style.display = "none";
    //btnModalFooter[2].style.display = "none";
    contenedorId.style.display = "none";
    limpiarInput();
}

function btnDetails(id) {
    btnModalFooter[0].style.display = "none";
    btnModalFooter[1].style.display = "block";
    //btnModalFooter[2].style.display = "block";
    contenedorId.style.display = "block";
    obtenerPorId(id);
}

obtener();