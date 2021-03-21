let exprEmail = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
let exprNombre = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
let exprPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
let arrData;
let err;
let elem;
// REGISTRARSE
$('#formIniciarSesion').on('submit', (e) => {
    e.preventDefault();
    arrData = [$('#inputName').val(), $('#inputEmail').val(), $('#inputConfirmEmail').val(), $('#inputPassword').val(), $('#inputConfirmPassword').val()];
    if (validarForm()) {
        $('#errores').html('<p>Registro Exitoso.</p>');
        anyadirUsuario();
    } else {
        $('#errores').html(`<p>${err}</p>`);
        elem.focus();
    }
});

function validarForm() {
    $('#errores').html('');
    let salida = true;
    if (exprNombre.test(arrData[0]) == false) {
        salida = false;
        err = 'El formato del nombre es incorrecto';
        elem = $('#inputName');
    }
    if (exprEmail.test(arrData[1]) == false || exprEmail.test(arrData[2]) == false) {
        salida = false;
        err = 'El formato del correo electrónico es incorrecto';
        elem = $('#inputEmail');
    }
    if (arrData[1] != arrData[2]) {
        salida = false;
        err = 'Los correos electrónicos no son iguales';
        elem = $('#inputConfirmEmail');
    }
    if (exprPass.test(arrData[3]) == false || exprPass.test(arrData[4]) == false) {
        salida = false;
        err = 'El formato de la contraseña es incorrecto';
        elem = $('#inputPassword');
    }
    if (arrData[3] != arrData[4]) {
        salida = false;
        err = 'Contraseñas no son iguales';
        elem = $('#inputConfirmPassword');
    }


    return salida;
}

function anyadirUsuario() {
    let fichero = './assets/data/usuarios.json';
    $.getJSON(fichero, function(data) {
        var nuevoUsuario = {
            id: data[data.length - 1].id + 1,
            mail: arrData[1],
            pass: arrData[3],
            name: arrData[0]
        };
        data.push(nuevoUsuario);
        var newData = JSON.stringify(data);
        jQuery.post(fichero, {
            newData: newData
        })
    });
}