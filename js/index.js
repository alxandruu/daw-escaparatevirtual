window.addEventListener('load', load);

function load() {

    usuarioSesion();
   
    let cabtn = document.querySelectorAll('#ca-btn'); //Boton de añadir producto al carrito

}

// Funciones Eventos

$('#microphoneSearcher').on('click', function() {
    let microphoneSearcher = document.querySelector('#microphoneSearcher');
    let catalogSearcher = document.querySelector('#inputSearcher');

    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();
    recognition.onstart = function() {
        microphoneSearcher.style.animation = 'microphoneListening 2000ms linear infinite';
    };
    recognition.onspeechend = function() {
        microphoneSearcher.style.animation = 'none';
    };
    recognition.onresult = function(e) {
        var transcript = e.results[0][0].transcript;
        catalogSearcher.setAttribute('value', transcript);
    };
});


// Otras funciones


function usuarioSesion() {
    let $sesionHTML = $('#sesion');
    if (localStorage.getItem('user') != null) {
        sessionStorage.setItem('user', localStorage.getItem('user'));
    }
    if (sessionStorage.getItem('user') == null) {
        $sesionHTML.html('Iniciar Sesión');
        $sesionHTML.attr('href', 'iniciarSesion.html');

    } else {
        notificacion();
        $('#nomUsuario').append($('<span>', { 'text': 'Bienvenido, ' }), $('<a>', { 'href': '#', 'class': 'link-custom mx-2', 'text': sessionStorage.getItem('user') }));
        $sesionHTML.html('Cerrar Sesión');
        $sesionHTML.attr('href', '#');

        $sesionHTML.on('click', function() {
            sessionStorage.removeItem('user');
            localStorage.removeItem('user');
            location.reload();
        })
    }
}

//  Notificaciones

function notificacion() {
    if (!("Notification" in window)) {
        alert("Este navegador no soporta las notificaciones del sistema");
    } else if (Notification.permission == 'granted') {
        let notificacion = new Notification('MINATO SHOP | NEWS', {
            image: './assets/novedades/m_ropamarron.jpg',
            body: 'Nuevas prendas de ropa disponibles en nuestra tienda. ',
            icon: './assets/favicon_ntf.jpg',
            requireInteraction: true
        });

    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                let notificacion = new Notification('MINATO SHOP | NEWS', {
                    image: './assets/novedades/m_ropamarron.jpg',
                    body: 'Nuevas prendas de ropa disponibles en nuestra tienda. ',
                    icon: './assets/favicon_ntf.jpg',
                    requireInteraction: true
                });
            }
        });
    }
}
//Agregar un nuevo producto al carro de la compra
function agregar() {
    //Recogemos todos los datos del producto
    let caja = this.closest('.p-info');
    let titulo = caja.querySelector('.p-titulo').textContent;
    let img = caja.querySelector('.p-img').src;
    let pr = caja.querySelector('.p-pr').textContent;
    alert(titulo + ' agregado al carrito')
    //Creamos un array con todos los datos del producto | 0. Titulo ; 1.Imagen | 2. Precio
    let arr = [
        titulo, img, pr
    ];
    // Convertimos el array en un String juntado con ; para agregar en el localStorage
    arr = arr.join(';');

    //Llamadas para probar funcionamiento
    juntar(arr); // Pasamos como parametro el nuevo producto para juntarlo con los anteriores (si los hay)

    descomponer(); //Descomponemos el localStorage en un array bidimensional para imprimir en la cesta.

}
// Juntar el nuevo con los anteriores
function juntar(nuevo) {
    let arr = [
        nuevo
    ]; //Agregamos el producto al array bidimiensional que se agregará en el LocalStorage
    let carrCompra = localStorage.getItem('carrito');
    //Agregar el carrito con el nuevo producto (sucede si hay algo en el carrito)
    if (carrCompra != null) {
        carrCompra = carrCompra.split(',');
        arr.push(carrCompra);
    }
    localStorage.setItem('carrito', arr);
    /*Añadir el array al carrito
       (cada producto esta separado por comas y cada dato del producto seperado por ;) esta así para convertirlo en array 
       y imprimirlo en la página del carrito*/

}
// DESCOMPONER CARRITO EN ARRAY BIDIMENSIONAL
function descomponer() {
    let nova = localStorage.getItem('carrito'); // Guardar en una variable el carrito en string;
    // Convertir el carrito de string a array bidimensional para imprimir en la página de carrito
    if (nova != null) {
        nova = nova.split(',');
        for (let index = 0; index < nova.length; index++) {
            nova[index] = nova[index].split(';');

        }
    }
    return nova;
}