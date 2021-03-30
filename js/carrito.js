mostrarAgregados()

function mostrarAgregados () {
    $("#carrito").empty()
    $("#botonServicios").empty()
    $("#finalizar").empty()
    if(serviciosAgregados.length <= 0) {
        $("#servAgregados").html(`No tenés servicios agregados al carrito`)
        $("#botonServicios").append(`<button type="submit" class="verServ">AGREGAR SERVICIOS</button>`)
    }else{
        var total = 0;
        serviciosAgregados.forEach ((agregado) => {
            $("#servAgregados").html(`Servicios Agregados`)
            $("#carrito").append(`<div class="estiloServicios">
                                            <input value = "${agregado.id}" type="hidden">
                                            <span class="fa-stack fa-4x">
                                                <i class="fas fa-circle fa-stack-2x icon-estilo"></i>
                                                <i class="fas ${agregado.icono} fa-stack-1x fa-inverse"></i>
                                            </span>
                                            <h4>${agregado.nombre}</h4>
                                            <p>${agregado.descripcion}</p>
                                            <h5>$${agregado.precio}</h5>
                                            <button onclick="quitarServ(${serviciosAgregados.indexOf(agregado)})" class="quitarServ">Quitar</button>
                                        </div>`)
        total = total + agregado.precio;                              
        })
        $("#botonServicios").append(`<button type="submit" class="verServ">AGREGAR MÁS SERVICIOS</button>`)
        $("#finalizar").append(`<h3>TOTAL: $${total}</h3>
                                <button onclick="finalizarCompra()" class="verServ">FINALIZAR COMPRA</button>`)
    }
}

function quitarServ (index) {
    let quitado = serviciosAgregados[index];
    listaServicios.push(quitado);
    serviciosAgregados.splice(serviciosAgregados.indexOf(quitado),1)
    mostrarAgregados()
    $('#notificacionQ').html(`Quitaste "${quitado.nombre}"`);
    $("#notificacionQ").fadeIn(1000).fadeOut(1000,() => { 
        localStorage.serviciosAgregados = JSON.stringify(serviciosAgregados)
        localStorage.listaServicios = JSON.stringify(listaServicios)
    })
}

function finalizarCompra () {
    $("#carrito").empty()
    $("#botonServicios").empty()
    $("#finalizar").empty()
    $("#servAgregados").html(`Gracias por tu compra!`)
}

//FINALIZAR COMPRA