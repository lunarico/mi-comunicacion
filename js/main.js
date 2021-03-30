//SI EXISTE LISTA SERVICIOS ME LO PARSEA, SINO ARRAY VACÍO
let listaServicios = localStorage.listaServicios ? JSON.parse(localStorage.listaServicios) : [];
const serviciosAgregados = localStorage.serviciosAgregados ? JSON.parse(localStorage.serviciosAgregados) : [];

//SI EL ARRAY ESTÁ VACIO, QUE ME HAGA EL GETJSON, SINO QUE ME LOS TRAIGA DE LOS QUE QUEDARON
if (listaServicios.length <= 0) {
    $( () => {
        $.getJSON("data/servicios.json",(respuesta, estado) => {
            if (estado === "success") {
              listaServicios = respuesta ;
              mostrarServicios()
            }
          })
      })
}else {
    mostrarServicios()
    $("#botonCompra").html(`<button type="submit" class="verServ">VER SERVICIOS AGREGADOS</button>`)
}


//FUNCION QUE MUESTRA LOS SERVICIOS
function mostrarServicios() {
    $("#contenidoServicios").empty()
    listaServicios.sort(function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
    })
    listaServicios.forEach ((info) => {
        $("#contenidoServicios").append(`<div class="estiloServicios" data-aos="flip-right">
                                            <input value = "${info.id}" type="hidden">
                                            <span class="fa-stack fa-4x">
                                                <i class="fas fa-circle fa-stack-2x icon-estilo"></i>
                                                <i class="fas ${info.icono} fa-stack-1x fa-inverse"></i>
                                            </span>
                                            <h4>${info.nombre}</h4>
                                            <p>${info.descripcion}</p>
                                            <h5>$${info.precio}</h5>
                                            <button onclick="agregarServ(${listaServicios.indexOf(info)})" class="agregarServ">Agregar</button>
                                        </div>`)
    })
}


//FUNCION QUE HACE EL BOTON DE AGREGAR SERVICIOS
function agregarServ (index) {
    let servicio = listaServicios[index];
    serviciosAgregados.push(servicio);
    listaServicios.splice(listaServicios.indexOf(servicio),1)
    $('#notificacion').html(`Agregaste "${servicio.nombre}"`); 
    mostrarServicios()
    $("#notificacion").fadeIn(1000).fadeOut(1000,() => {
         localStorage.serviciosAgregados = JSON.stringify(serviciosAgregados)
         $("#botonCompra").html(`<button type="submit" class="verServ">VER SERVICIOS AGREGADOS</button>`)
         localStorage.listaServicios = JSON.stringify(listaServicios)
    })
}


//SI NO HAY NINGUN SERVICIO AGREGADO QUE NO APAREZCA EL BOTÓN DE VER AGREGADOS
if(serviciosAgregados.length <= 0) {
    $("#botonCompra").empty()
}else{
    $("#botonCompra").html(`<button type="submit" class="verServ">VER SERVICIOS AGREGADOS</button>`)
}