let exprEmail = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
let arrData;
let uers_data;












// INICIAR SESION 
$('#formIniciarSesion').on('submit', (e) => {
    e.preventDefault();
    arrData = [$('#inputEmail').val(), $('#inputPassword').val()];
    if (validarForm()) {
        cargarFicheroUsuarios();
    }
});

function validarForm() {
    $('#errores').html('');
    let salida = true;
    if (exprEmail.test(arrData[0]) == false) {
        salida = false;
        $('#errores').html('<p> Formato Email. Incorrecto</p>');
    }
    return salida;
}

function cargarFicheroUsuarios() {
    let fichero = './assets/data/usuarios.json';
    fetch(fichero, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();

            } else {
                console.log(`Carga Fallada`)
            }
        })
        .then(data => comprobarUsuario(data));
}

function comprobarUsuario(data) {
    let salida = false;
    let nameUser;
    for (let i = 0; i < data.length && !salida; i++) {
        if (data[i].mail === arrData[0] && data[i].pass === arrData[1]) {
            salida = true;
            nameUser = data[i].name;
        }
    }

    if (salida) {
        if ($('#inputRecuerdame').is(":checked")) {
            localStorage.setItem('user', nameUser);
        } else {
            sessionStorage.setItem('user', nameUser);
        }
        window.location.href = 'index.html';
    } else {
        $('#errores').html('Email/Contraseña Incorrecta');
    }
}