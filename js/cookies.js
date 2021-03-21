window.addEventListener('load', load);

function load() {
    if (existeCookie('cookie_acc')) {
        $('#cookie').hide();

    } else {
        $('html, body').css({ 'overflow': 'hidden', 'height': '100%;' });

        $('#cookie').show();


    }
}


$('#btn-cookie').on('click', function() {
    let h = new Date();
    let cad = new Date(h.getFullYear() + 1, h.getMonth(), h.getDate());
    document.cookie = `cookie_acc=ok; expires=${cad}`;
    $('html, body').css({ 'overflow': 'auto', 'height': 'auto;' });
    $('#cookie').hide();

});

function existeCookie(n) {
    if (getCookie(n)) {
        return true;
    } else {
        return false;
    }
}

function getCookie(n) {
    let salida = false;
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length & !salida; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        x = c.indexOf('=');
        n = c.slice(0, x);
        if (n == n) {
            let k = c.substring(n.length + 1, c.length);
            if (k == '') {
                salida = false;
            } else {
                salida = true;
            }
        }
    }
    return salida;
}

