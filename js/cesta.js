window.onload = iniciar;

function iniciar() {
    if (sessionStorage.getItem('user') == null) {
        document.getElementById('newMember').style.display = 'block';

    }
    anyadirCes();
}


function anyadirCes() {
    var fila = document.createElement("div");
    var carro = document.querySelector(".shoppingCartItemsContainer");

    var carrito = descomponer();
    var contenido = "";
    if (carrito != null) {
        for (i = 0; i < carrito.length; i++) {
            contenido += `<div class="row shoppingCartItem">
    
        <div class="col-8">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom p-3">
                <img src=${carrito[i][1]} class="shopping-cart-image me-5" style="width:30%">
                <h4 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${carrito[i][0]}</h4 >
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p><span class="item-price mb-0 shoppingCartItemPrice">${carrito[i][2]}</span> €</p>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <button class="btn btn-danger borrarBoton" type="button">X</button>
            </div>
        </div>
    </div>`;
        }
    } else {
        contenido = "No hay productos en la cesta";
    }




    fila.innerHTML = contenido;
    carro.append(fila);
    calcularPrecio();
    eventoEliminar();
}

function calcularPrecio() {

    var pr = document.getElementsByClassName("shoppingCartItem");

    if (pr != null) {
        var precios = document.getElementsByClassName("shoppingCartItemPrice");

        var resultado = 0;
        for (i = 0; i < precios.length; i++) {
            resultado = Number(precios[i].textContent) + resultado;
        }
        let iva = Number((resultado * 0.21).toFixed(2));
        resultado = (resultado + iva).toFixed(2);

        document.getElementById("iva").textContent = iva;
        document.getElementById("precioF").innerHTML = resultado;

    }


}

function eventoEliminar() {
    var botones = document.getElementsByClassName("borrarBoton");

    for (i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", eliminarPr);
    }
}

function eliminarPr(e) {

    var boton = e.target;
    //Coger el elemento más cercano con la clase imp
    var elemento = boton.closest('.shoppingCartItem');
    var img = elemento.querySelector('.shopping-cart-image').src;
    var titulo = elemento.querySelector('.shoppingCartItemTitle').textContent;
    var precio = elemento.querySelector('.shoppingCartItemPrice').textContent;



    var array = [

        titulo, img, precio

    ];
    var pr = descomponer();

    if (pr != null) {
        for (i = 0; i < pr.length; i++) {
            if (pr[i][0] == array[0] && pr[i][1] == array[1] && pr[i][2] == array[2]) {
                if (pr.length == 1) {
                    localStorage.removeItem('carrito');
                } else {
                    pr.splice(i, 1);
                    localStorage.setItem('carrito', convertirString(pr));
                }
            }
        }
        location.reload();
    }


}

function convertirString(producto) {
    for (i = 0; i < producto.length; i++) {
        producto[i] = producto[i].join(';');
    }
    producto = producto.join(',');
    return producto;
}
function vaciarCesta() {
    let ok = confirm("¿Estas seguro de vaciar la cesta?");
    if (ok) {
        localStorage.removeItem('carrito'); 
        location.reload();
    }


}
