// MENÚ MOBILE

let active = false;

const button = document.querySelector(".navbar-burger");
const menu = document.querySelector(".navbar-menu");

function toggleMenu() {
  if (active == false) {
    button.classList.add("is-active");
    menu.classList.add("is-active");
    active = true;
  } else {
    button.classList.remove("is-active");
    menu.classList.remove("is-active");
    active = false;
  }
}

// ABRIR Y CERRAR MODALES
const allButtons = document.querySelectorAll("button");
let isActive = false; // INDICA SI HAY ALGUNA MODAL ACTIVA
let activeName; // NAME DE VENTANA ACTIVA
let activeForm; // SELECCIÓN DE FORMULARIO ACTIVO EL CUAL DEPENDE DEL ACTIVE NAME
let activeInputs; // SELECCIÓN DE TODOS LOS INPUTS DEL FORMULARIO

allButtons.forEach((btn) => {
  if (location.pathname.substring(1) == "login.html") {
    activeName = "login";
    activeForm = document.querySelector(`.form-${activeName}`);
    activeInputs = document.querySelectorAll(
      `.form-${activeName} input:not(:disabled)`
    );
  } else if (location.pathname.substring(1) == "registro.html") {
    activeName = "registro";
    activeForm = document.querySelector(`.form-${activeName}`);
    activeInputs = document.querySelectorAll(
      `.form-${activeName} input:not(:disabled)`
    );
  }

  btn.onclick = function () {
    if (btn.type != "submit") {
      activeName = this.name;
      activeForm = document.querySelector(`.form-${activeName}`);
      activeInputs = document.querySelectorAll(
        `.form-${activeName} input:not(:disabled)`
      ); // SELECCIONADO TODOS LOS INPUTS HABILITADOS
      toggleForm();
    }

    // NOTIFICACIONES DE BORRAR ETC
    // Si el boton tiene el name indicado se crea la notificacion
    if (this.name == "deleteUser") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "Usuario eliminado exitosamente!",
        0
      );
    }

    if (this.name == "deleteProduct") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "Producto eliminado exitosamente!",
        0
      );
    }

    if (this.name == "deleteClient") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "Cliente eliminado exitosamente!",
        0
      );
    }

    if (this.name == "deleteRol") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "Rol eliminado exitosamente!",
        0
      );
    }

    if (this.name == "pdf") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "¿Seguro desea generar un PDF?",
        1
      );
    }

    if (this.name == "deleteingrediente") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "Ingrediente eliminado exitosamente",
        0
      );
    }
    if (this.name == "cancelPedido") {
      crearNotificacion(
        document.querySelector(".container .notifications"),
        "warning",
        "Pedido cancelado exitosamente",
        0
      );
    }
  };
});

function toggleForm() {
  if (isActive) {
    activeInputs.forEach((inp) => {
      if (activeName != "edit") {
        // AL CERRAR MODAL SE REINICIAN INPUTS
        inp.value = "";
        inp.classList.remove("is-success");
        inp.classList.remove("is-danger");
      }
    });
    document
      .querySelector(`.modal-${activeName}`)
      .classList.remove("is-active");
    isActive = false;
    campos = {}; // SE LIMPIA EL OBJETO AL CERRAR MODAL
  } else {
    document.querySelector(`.modal-${activeName}`).classList.add("is-active");
    isActive = true;
  }

  activeForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    activeInputs.forEach((inp) => {
      if (!inp.value) {
        campos[inp.name] = "";
        campos[inp.name + "Pass"] = false;
      }
    });

    function allTrue(obj) {
      for (var o in obj) if (!obj[o]) return false;

      return true;
    }

    Object.keys(campos).forEach((key) => {
      if ((key, campos[key] == "")) {
        crearNotificacion(
          activeForm?.parentElement.querySelector(".notifications"),
          "error",
          "Rellene todos los campos",
          0
        );
      }
    });

    if (allTrue(campos)) {
      if (location.pathname.substring(1) == "usuarios.html") {
        notificacionAñadir("Usuario", "usuario");
      } else if (location.pathname.substring(1) == "clientes.html") {
        notificacionAñadir("Cliente", "cliente");
      } else if (location.pathname.substring(1) == "adminProductos.html") {
        notificacionAñadir("Producto", "producto");
      } else if (location.pathname.substring(1) == "adminingredientes.html") {
        notificacionAñadir("Ingrediente", "ingrediente");
      } else if (location.pathname.substring(1) == "roles.html") {
        notificacionAñadir("Rol", "rol");
      } else if (location.pathname.substring(1) == "ventas.html") {
        notificacionAñadir("Venta", "venta");
      }
      toggleForm();
    }
  });

  activeInputs?.forEach((inp) => {
    inp.addEventListener("keyup", validarFormulario); // CUANDO SE DESSELECCIONE EL INPUT
    inp.addEventListener("blur", validarFormulario);
  });
}

const validarFormulario = (e) => {
  switch (
    e.target.name // NOMBRE DEL INPUT QUE ESTA SIENDO VALIDADO
  ) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target);
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target);
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target);
      break;
    case "password":
      validarCampo(expresiones.contrasena, e.target);
      break;
    case "email":
      validarCampo(expresiones.correo, e.target);
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target);
      break;
    case "direccion":
      validarCampo(expresiones.direccion, e.target);
      break;
    case "numero":
      validarCampo(expresiones.numero, e.target);
      break;
  }
};

const validarCampo = (expresion, input) => {
  if (expresion.test(input.value)) {
    input.classList.remove("is-danger");
    input.classList.add("is-success");
    campos[input.name] = input.value;
    campos[input.name + "Pass"] = true;
  } else {
    input.classList.remove("is-success");
    input.classList.add("is-danger");
    campos[input.name] = "";
    campos[input.name + "Pass"] = false;
  }
};

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]+$/,
  nombre: /^[a-zA-Z]+$/,
  apellido: /^[a-zA-Z]+$/,
  contrasena: /^.{4,12}$/,
  correo: /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{10}$/,
  direccion: /^[a-zA-Z0-9#\s -]+$/,
  numero: /^[0-9]+$/,
};

let campos = {};

if (
  location.pathname.substring(1) == "login.html" ||
  location.pathname.substring(1) == "registro.html"
) {
  activeForm?.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  activeInputs?.forEach((inp) => {
    inp.addEventListener("keyup", validarFormulario); // CUANDO SE DESSELECCIONE EL INPUT
    inp.addEventListener("blur", validarFormulario);
  });
}

// NOTIFICACIONES

// CREAR NOTIFICACION
function crearNotificacion(elem, type, msg, btns) {
  if (btns == 0) {
    elem.innerHTML = `
        <div class="notification has-text-centered is-${type} mt-5">
            <b>${msg}</b>
        </div>`;
    setTimeout(() => {
      elem.innerHTML = "";
    }, 3000);
  } else if (btns == 1) {
    elem.innerHTML = `
      <div class="notification has-text-centered is-${type} mt-5">
          <b>${msg}</b>
          <br>
          <button class="button is-small is-error mt-3" type="button" onclick="cerrarNotificacion(this)">Cancelar</button>
          <button class="button is-small is-success mt-3 ml-4" type="button" onclick="crearPDF(this)">Confirmar</button>
      </div>`;
  }
}

function notificacionAñadir(modulo, lineaDos) {
  crearNotificacion(
    document.querySelector(".container .notifications"),
    "success",
    activeName == "new"
      ? `${modulo} creado con exito!`
      : `Los datos del ${lineaDos} han sido actualizados!`,
    0
  );
}

function crearPDF(e) {
  e.parentElement.remove();
  crearNotificacion(
    document.querySelector(".container .notifications"),
    "success",
    "PDF Generado exitosamente!",
    0
  );
}

function cerrarNotificacion(e) {
  e.parentElement.remove();
}

function eliminarNotificaciones(elem) {
  elem.innerHTML = "";
}
