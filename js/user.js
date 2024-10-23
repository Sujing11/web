
document.getElementById("formvalidate").addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("userMail").value;
    const contraseña = document.getElementById("userPassword").value;

    fetch(apiURL)
        .then(response => response.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === correo && u.password === contraseña);

            if (usuario) {
                alert(`Bienvenido, ${usuario.name} ${usuario.lastName}!`);
                window.location.href = "index.html"; // 
            } else {
                alert("Usuario no encontrado, por favor verifique sus credenciales");
            }
        })
        .catch(error => {
            console.log('error', error);
            alert('Ocurrió un error al intentar iniciar sesión');
        });

    document.getElementById("formvalidate").reset();
});