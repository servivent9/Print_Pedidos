/* Buscando los valores de la URL con la propiedad  window.location.search de JavaScript */
const paramURL = window.location.search
/* console.log(paramURL); */

//Creamos una instancia de URLSearchParams
const parametrosURL = new URLSearchParams(paramURL);

/*
Para acceder a los parámetros de la URL crearemos un objeto de tipo URLSearchParams y 
usaremos el método get() para obtener cada uno de los valores
*/


    var ths = document.getElementsByTagName("th");
    var ct = document.getElementById("colum_total");
    var fc = document.getElementById("content_info_registro");
    var fp = document.getElementById("precios");

    ct.style.backgroundColor = "#00a8f4";
    fp.style.borderColor =  "#00a8f4";
    fc.style.backgroundColor = "#F5FBFF";
    fp.style.backgroundColor = "#F5FBFF";    

    for (var i = 0; i < ths.length; i++) {
        ths[i].style.backgroundColor = "#00a8f4";
    }



//-----------DATOS CLIENTES----------------------
const codigoCliente = parametrosURL.get('codigoCliente');
const nombreCliente = parametrosURL.get('nombreCliente');
const telefonoCliente = parametrosURL.get('telefonoCliente');
/* Mostrando parametros en mi HTML */
document.querySelector("#codigoCliente").innerHTML = (codigoCliente);
document.querySelector("#nombreCliente").innerHTML = (nombreCliente);
document.querySelector("#telefonoCliente").innerHTML = (telefonoCliente);

//-----------DATOS REGISTRO----------------------
const fechaRegistro = parametrosURL.get('fechaRegistro');
const usuario = parametrosURL.get('usuario');
/* Mostrando parametros en mi HTML */

document.querySelector("#fechaRegistro").innerHTML = (fechaRegistro);
document.querySelector("#usuario").innerHTML = (usuario);

//-----------DATOS TABLA PRODUCTOS----------------------
const canProducto = parametrosURL.get('canProducto');
const codigoProducto = parametrosURL.get('codigoProducto');
const Producto = parametrosURL.get('Producto');
const precioUnitario = parametrosURL.get('precioUnitario');
const precioTotal = parametrosURL.get('precioTotal');


/*FUNCION PARA UNIR ARRAYS*/
function arrayProductos(datos1, datos2, datos3, datos4, datos5) {
    let contenido = [datos1, datos2, datos3, datos4, datos5];

    return contenido.reduce(
        (a, v) => (v.forEach((e, i) => a[i].push(e)), a),
        Array.from({
            length: Math.max(...contenido.map(d => d.length))
        }).map(d => [])
    );
}
//Convertimos en array cantidad, item, precio
const cantidadProducto = canProducto.split(" , ");
const codigoP = codigoProducto.split(" , ");
const nombreProducto = Producto.split(" , ");
const precioU = precioUnitario.split(" , ");
const precioT = precioTotal.split(" , ");

//CREAR NUEVOS ARRAY FORMATEADO A MONEDAS
const precioUN = [];
const precioTN = [];

precioU.forEach((pU) => {    
    pU = new Intl.NumberFormat('es-BO',{ style: 'currency', currency: 'BOB' }).format(pU)
    precioUN.push(pU);
});

precioT.forEach((pU) => {    
    pU = new Intl.NumberFormat('es-BO',{ style: 'currency', currency: 'BOB' }).format(pU)
    precioTN.push(pU);
});

//VARIABLE CON EL NUEVO ARRAY DE TODOS LOS ARRAY
const ventas = arrayProductos(cantidadProducto, codigoP, nombreProducto, precioUN, precioTN);

/* Mostrando parametros en mi HTML */
/* URL YOUTUBE https://www.youtube.com/watch?v=dDy2krKujCY
 https://www.youtube.com/watch?v=DMGiOhH8jcQ */
const tabla = document.getElementById("tabla_producto");
const cuerpoTabla = document.createElement('tbody');

ventas.forEach(p => {
    let fila = document.createElement('tr');

    fila.innerHTML += `<td class="tdCan">${p[0]}</td>`
    fila.innerHTML += `<td class="tdCodigoP">${p[1]}</td>`
    fila.innerHTML += `<td class="tdProducto">${p[2]}</td>`
    fila.innerHTML += `<td class="tdPrecioU">${p[3]}</td>`
    fila.innerHTML += `<td class="tdTotal">${p[4]}</td>`

    cuerpoTabla.appendChild(fila);
});
tabla.appendChild(cuerpoTabla);

//-----------DATOS PRECIOS CAJA----------------------

const total = parametrosURL.get('total');
// formateamos a moneda Bs.

const formatTotal = new Intl.NumberFormat('es-BO',{ style: 'currency', currency: 'BOB' }).format(total);

// Mostrando parametros en mi HTML

document.querySelector("#total").innerHTML = (formatTotal);