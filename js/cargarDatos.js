(function cargar() {
    let fichero = './assets/data/pr.json';
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
        .then(data => impPR(data));
}())


function impPR(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].info == 'novedad') {

            $('#sNovedades').append(
                cartaNovedad(data[i])
            );

        } else if (data[i].info == 'promo') {
            $('#sPromo').append(
                cartaPromo(data[i])
            );
        } else {
            console.log('Error al identifcar info');
        }
    }
    cargarBotones();
}

function cargarBotones() {
    let cabtn = document.querySelectorAll('.ca-btn');
    for (let index = 0; index < cabtn.length; index++) {
        cabtn[index].addEventListener('click', agregar);

    }
}

function cartaNovedad(data) {
    return $('<div>', {
        'class': 'col-md-3'
    }).append(
        $('<img>', {
            'src': `assets/novedades/${data.img}`,
            'class': 'img-fluid'
        }),
        $('<div>', {
            'class': 'text-center'
        }).append(
            $('<h3>', {
                'class': 'mt-2',
                'text': data.title
            }),
            $('<p>', {
                'class': 'mt-3 fw-bold',
                css: {
                    'font-size': '1.325rem'
                },
                'text': `${data.precio} €`
            }),
            $('<p>', {
                'class': 'text-muted',
                css: {
                    'font-size': ' 0.825rem'
                },
                'text': 'Novedad'
            }),
        ))
}

function cartaPromo(data) {
    return $('<div>', {
        'class': 'col-md-3 my-2  p-info'
    }).append(
        $('<div>', {
            'class': 'position-relative'
        }).append(
            $('<img>', {
                'src': `assets/promo/${data.img}`,
                'class': 'd-block w-100 p-img'
            }),
            $('<span>', {
                'class': 'position-absolute top-0 end-0 bordered rounded m-3 p-2 bg-danger',
                css: {
                    'color': 'white',
                    'font-size': '1rem'
                },
                'text': `-${data.pdesc}%`
            }),
            $('<h4>', {
                'class': 'position-absolute bottom-0 start-0 m-3 p-titulo',
                css: {
                    'color': 'white'
                },
                'text': data.title
            })
        ),
        $('<div>', {
            'class': 'd-flex align-items-center mt-3 mx-2'
        }).append(
            $('<del>', {
                'id': 'pr-descuento',
                'class': 'text-muted',
                'text': `${data.precio} €`
            }),
            $('<div>', {
                'id': 'prc-descuento',
                'class': 'ms-2 ',
            }).html(`<span class="p-pr">${(data.precio-(data.precio*(data.pdesc/100))).toFixed(2)}</span> €`),
            $('<button>', {
                'class': 'btn btn-danger mx-3 ca-btn'
            }).append(
                $('<i>', {
                    'class': 'fas fa-cart-plus'
                })
            )
        )
    )
}