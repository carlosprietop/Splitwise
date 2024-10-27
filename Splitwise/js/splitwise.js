class Usuario {
  constructor(nombre, pathImg) {
    this.nombre = nombre;
    this.gastos = [];
    this.pathImg = pathImg;
  }

  addGasto(gasto) {
    this.gastos.push(gasto);
  }

  //funcion para calcular los gastos totales del usuario
  totalGastos() {
    let total = 0;
    for (let i = 0; i < this.gastos.length; i++) {
      total += this.gastos[i].monto;
    }
    return total;
  }
}

class Gasto {
  constructor(titulo, monto, fecha) {
    this.titulo = titulo;
    this.monto = monto;
    this.fecha = fecha;
  }
}

// creacion de los usuarios
let usuarioJuan = new Usuario("Juan", "img/usuarios/avatar_a.png");
let usuarioAna = new Usuario("Ana", "img/usuarios/avatar_b.png");
let usuarioPedro = new Usuario("Pedro", "img/usuarios/avatar_c.png");

// añadir los usuarios a la lista de usuarios.
let listaUsuarios = [];
listaUsuarios.push(usuarioJuan, usuarioAna, usuarioPedro);

// funcion que en el campo seleccionar hay usuario hay un usuario seleccionado
function comprobarSeleccion() {
  let inputSelect = document.getElementById("select");
  let comprobacion = false;
  if (inputSelect.value === "---") {
    inputSelect.classList.add("no_valida");
  } else {
    inputSelect.classList.remove("no_valida");
    inputSelect.classList.add("valida");
    comprobacion = true;
  }
  return comprobacion;
}

// Validacion campo titulo
function comprobarTitulo() {
  let inputTitulo = document.getElementById("input_titulo");
  let comprobacion = false;
  let expresion = /^[a-zA-Z0-9]{1,20}$/;
  if (expresion.test(inputTitulo.value)) {
    inputTitulo.classList.add("valida");
    inputTitulo.classList.remove("no_valida");
    comprobacion = true;
  } else {
    inputTitulo.classList.add("no_valida");
    inputTitulo.classList.remove("valida");
  }
  return comprobacion;
}

// funcion para validar el campo importe
function comprobarImporte() {
  let inputImporte = document.getElementById("input_importe");
  let comprobacion = false;
  let expresion = /^(?:1000\.00|[0-9]{1,3}\.[0-9]{2})$/;
  if (expresion.test(inputImporte.value)) {
    inputImporte.classList.add("valida");
    inputImporte.classList.remove("no_valida");
    comprobacion = true;
  } else {
    inputImporte.classList.add("no_valida");
    inputImporte.classList.remove("valida");
  }
  return comprobacion;
}

// funcion para validar el campo fecha
function comprobarFecha() {
  let inputFecha = document.getElementById("input_fecha");
  let comprobacion = false;
  let expresion = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  if (expresion.test(inputFecha.value)) {
    inputFecha.classList.add("valida");
    inputFecha.classList.remove("no_valida");
    comprobacion = true;
  } else {
    inputFecha.classList.add("no_valida");
    inputFecha.classList.remove("valida");
  }
  return comprobacion;
}

//creamos los div del apartado de cuentas
crearDivCuenta();
// obtenemos del dom boton enviar y le añadimos un evento de click.
let btnEnviar = document.getElementById("enviar");
btnEnviar.addEventListener("click", (event) => {
  event.preventDefault(); // Previene el envío del formulario
  let valorSelect = document.getElementById("select").value;
  let valorTitulo = document.getElementById("input_titulo").value;
  let valorImporte = document.getElementById("input_importe").value;
  let valorFecha = document.getElementById("input_fecha").value;

  if (
    // si todos los campos estan correctos, limpiamos los campos y añadimos un nuevo gasto
    comprobarSeleccion() == true &&
    comprobarCampos() == true &&
    comprobarTitulo() == true &&
    comprobarImporte() == true &&
    comprobarFecha() == true
  ) {
    limpiarCampos();
    nuevoGasto(valorSelect, valorTitulo, valorImporte, valorFecha);
  } else if (comprobarCampos() == false) {
    comprobarTitulo();
    comprobarImporte();
    comprobarFecha();
    alert("Debes rellenar todos los campos.");
  }
});

// funcion para comprobar que todos los campos están rellenos
function comprobarCampos() {
  let valorSelect = document.getElementById("select").value;
  let valorTitulo = document.getElementById("input_titulo").value;
  let valorImporte = document.getElementById("input_importe").value;
  let valorFecha = document.getElementById("input_fecha").value;

  let camposRellenos = true;
  let valoresInput = [];
  valoresInput.push(valorSelect, valorTitulo, valorImporte, valorFecha);
  valoresInput.forEach((valor) => {
    if (valor == "" || valor == "---") {
      camposRellenos = false;
    }
  });

  return camposRellenos;
}

// funcion para limpiar los campos cuando se envie el formulario
function limpiarCampos() {
  let valorSelect = document.getElementById("select");
  let valorTitulo = document.getElementById("input_titulo");
  let valorImporte = document.getElementById("input_importe");
  let valorFecha = document.getElementById("input_fecha");

  valorSelect.value = "---";
  valorSelect.classList.remove("valida");
  valorTitulo.value = "";
  valorTitulo.classList.remove("valida");
  valorImporte.value = "";
  valorImporte.classList.remove("valida");
  valorFecha.value = "";
  valorFecha.classList.remove("valida");
}

// Funcion para crear la estructura del div de la pestaña resumen
function crearDivResumen(path, nombre, cantidad, fecha) {
  // Creamos el elemento principal
  let div_principal = document.createElement("div");
  div_principal.setAttribute("class", "card mb-12 espacio");

  // Creamos el div para la fila
  let fila = document.createElement("div");
  fila.setAttribute("class", "row g-0");

  // Creamos la columna de la imagen
  let columnaImg = document.createElement("div");
  columnaImg.setAttribute("class", "col-md-2");

  // Creamos la imagen
  let imagen = document.createElement("img");
  imagen.src = path;
  imagen.setAttribute("class", "img-fluid rounded-start");

  // Añadimos la imagen a su columna
  columnaImg.appendChild(imagen);

  // Creamos la columna del contenido
  let columnaTexto = document.createElement("div");
  columnaTexto.setAttribute("class", "col-md-10");

  // Creamos el cuerpo de la tarjeta
  let cuerpoTarjeta = document.createElement("div");
  cuerpoTarjeta.setAttribute("class", "card-body");

  // Creamos el título y el parrafo
  let titulo = document.createElement("h5");
  titulo.setAttribute("class", "card-title");
  titulo.textContent = nombre;

  let parrafo = document.createElement("p");
  parrafo.setAttribute("class", "card-text");
  parrafo.textContent = "Pagó " + cantidad + "€" + " el " + fecha;

  // Añadios el título y el párrafo al cuerpo de la tarjeta
  cuerpoTarjeta.appendChild(titulo);
  cuerpoTarjeta.appendChild(parrafo);

  // Añadirmosel cuerpo de la tarjeta a su columna
  columnaTexto.appendChild(cuerpoTarjeta);

  // Añadimos las columnas a la fila
  fila.appendChild(columnaImg);
  fila.appendChild(columnaTexto);

  // Añadirmos la fila a la tarjeta
  div_principal.appendChild(fila);

  // añadirmos el div principal al div de la pestaña resumen
  let divAcordeonResumen = document.getElementById("acordeon_resumen");
  divAcordeonResumen.appendChild(div_principal);
}

// funcion para crear un nuevo gasto.
function nuevoGasto(valorSelect, valorTitulo, valorImporte, valorFecha) {
  // funcion para añadir nuevo gasto a la pestaña resumen
  let usuarioSeleccionado;

  listaUsuarios.forEach((usuario) => {
    if (usuario.nombre === valorSelect) {
      usuarioSeleccionado = usuario;
    }
  });
  console.log(usuarioSeleccionado);

  let gasto = new Gasto(valorTitulo, parseFloat(valorImporte), valorFecha);
  usuarioSeleccionado.addGasto(gasto);
  // cada vez que añadimos un gasto, creamos un div en la pestaña resumen
  crearDivResumen(
    usuarioSeleccionado.pathImg,
    usuarioSeleccionado.nombre,
    valorImporte,
    valorFecha
  );
  // cada vez que añadimos un gasto, actualizamos las cuentas de cada usuario
  actualizarCuentas();
}

function crearDivCuenta() {
  // funcion para crear la estructura del div de la pestaña cuentas por cada usuario
  // es similar al div de la pestaña resumen

  listaUsuarios.forEach((usuario) => {
    // Creamos el elemento principal
    let div_principal = document.createElement("div");
    div_principal.setAttribute("class", "card mb-12 espacio");

    let fila = document.createElement("div");
    fila.setAttribute("class", "row g-0");

    let columnaImg = document.createElement("div");
    columnaImg.setAttribute("class", "col-md-2");

    let imagen = document.createElement("img");
    imagen.src = usuario.pathImg;
    imagen.setAttribute("class", "img-fluid rounded-start");

    columnaImg.appendChild(imagen);

    let columnaTexto = document.createElement("div");
    columnaTexto.setAttribute("class", "col-md-10");

    let cuerpoTarjeta = document.createElement("div");
    cuerpoTarjeta.setAttribute("class", "card-body");

    let titulo = document.createElement("h5");
    titulo.setAttribute("class", "card-title");
    titulo.textContent = usuario.nombre;

    let parrafo = document.createElement("p");
    parrafo.setAttribute("class", "card-text");
    parrafo.setAttribute("id", `parrafo${usuario.nombre}`);
    parrafo.textContent = "Ha pagado" + " 0€," + " debe  0€ ";

    cuerpoTarjeta.appendChild(titulo);
    cuerpoTarjeta.appendChild(parrafo);

    columnaTexto.appendChild(cuerpoTarjeta);

    fila.appendChild(columnaImg);
    fila.appendChild(columnaTexto);

    div_principal.appendChild(fila);

    // obtenemos el div del apartado de cuentas y le añadimos el div creado
    let divAcordeonCuenta = document.getElementById("acordeon_cuenta");
    divAcordeonCuenta.appendChild(div_principal);
  });
}

// funcion para calcular el promedio de gastos en relacion a todos los usuarios
function calculoPromedio() {
  let totalUsuarios = calcularTotalUsuarios(); // calculamos el total de los gastos de todos los usuarios
  let mediaGastosUsuarios = totalUsuarios / listaUsuarios.length; // calculamos la media de los gastos
  return mediaGastosUsuarios;
}

// funcion para calcular el total de gastos de todos los usuarios
function calcularTotalUsuarios() {
  let total = 0;
  for (let i = 0; i < listaUsuarios.length; i++) {
    total += listaUsuarios[i].totalGastos();
  }
  return total;
}

// funcion para actualizar las cuentas de cada usuario
function actualizarCuentas() {
  // por cada usuario del array calculamos su balance y modificamos el parrafo donde va la nueva cuenta
  listaUsuarios.forEach((usuario) => {
    let parrafo = document.getElementById(`parrafo${usuario.nombre}`);
    parrafo.textContent = "";
    let gastoUsuario = usuario.totalGastos();
    let promedioGastos = calculoPromedio();
    let balance = gastoUsuario - promedioGastos;
    if (balance > 0) {
      parrafo.textContent =
        "Ha pagado " +
        gastoUsuario +
        "€ se le debe " +
        balance.toFixed(2) +
        "€";
    } else if (balance < 0) {
      parrafo.textContent =
        "Ha pagado " +
        gastoUsuario +
        "€ debe " +
        Math.abs(balance).toFixed(2) + // math.abs para convertir el valor negativo en un valor positivo Math.fixed para redondear 2 decimales
        "€";
    } else if (balance === 0) {
      parrafo.textContent = "Ha pagado " + gastoUsuario + "€ deuda liquidada";
    }

    console.log(balance + usuario.nombre);
  });
}
