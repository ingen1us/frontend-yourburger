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

// VALIDACIONES FORMULARIO
let isActive = false;
let activeForm;
let activeInputs;
let activeName;
let allButtons = document.querySelectorAll("button");
let hayEmail = false;
let haySlides = false;
let haydir = false;
let haySelect = false;
let Select = document.querySelector("div.select select");
let hayNumero = false;

allButtons.forEach((btn) => {
  btn.onclick = function () {
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
    

    if (this.name != "") {
      activeName = this.name;
      activeForm = document.querySelector(`.form-${this.name}`);
      activeInputs = document.querySelectorAll(`.form-${this.name} input`);
    }

    function toggleForm() {
      if (isActive) {
        document.querySelector(`.form-${btn.name}`).reset();
        activeInputs.forEach((inp) => {
          inp.classList.remove("is-success");
          inp.classList.remove("is-danger");
        });
        campos["text"] = false;
        campos["email"] = false;
        campos["checkbox"] = false;
        campos["dir"] = false;
        campos["select"] = false;
        campos["number"] = false;
        document
          .querySelector(`.modal-${btn.name}`)
          .classList.remove("is-active");
        isActive = false;
      } else {
        eliminarNotificaciones(
          activeForm.parentElement.querySelector(".notifications")
        );
        document.querySelector(`.modal-${btn.name}`).classList.add("is-active");
        isActive = true;
        activeInputs.forEach((inp) => {
          if (inp.type == "email") {
            hayEmail = true;
          }
          if (document.querySelector("div.slides")) {
            haySlides = true;
          }
          if (inp.name == "dir") {
            haydir = true;
          }
          if (inp.type == "number") {
            hayNumero = true;
          }
        });
        if (document.querySelector("div.select select")) {
          haySelect = true;
        }
        if (!hayEmail) {
          campos["email"] = true;
        }
        if (!haySlides) {
          campos["checkbox"] = true;
        }
        if (!haydir) {
          campos["dir"] = true;
        }
        if (!haySelect) {
          campos["select"] = true;
        }
        if (!hayNumero) {
          campos["number"] = true;
        }
      }
    }

    activeInputs.forEach((input) => {
      input.addEventListener("keyup", validarFormulario);
      input.addEventListener("blur", validarFormulario);
      input.addEventListener("change", validarFormulario);
    });
    if (Select) {
      Select.addEventListener("keyup", validarFormulario);
      Select.addEventListener("blur", validarFormulario);
      Select.addEventListener("change", validarFormulario);
    }

    activeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (campos.text && campos.number && hayNumero == true) {
        console.log("Pasó");
        toggleForm();
        if (location.pathname.substring(1) == "clientes.html") {
          crearNotificacion(
            document.querySelector(".container .notifications"),
            "success",
            activeName == "new"
              ? "Cliente creado con exito!"
              : "Los datos del cliente han sido actualizados!",
            0
          );
        } else if (location.pathname.substring(1) == "adminProductos.html") {
          crearNotificacion(
            document.querySelector(".container .notifications"),
            "success",
            activeName == "new"
              ? "Producto creado con exito!"
              : "La información del producto ha sido actualizada!",
            0
          );
        } else if (location.pathname.substring(1) == "adminingredientes.html") {
          crearNotificacion(
            document.querySelector(".container .notifications"),
            "success",
            activeName == "new"
              ? "Ingrediente creado con exito!"
              : "La información del ingrediente ha sido actualizada!",
            0
          );
        }
      } else {
        crearNotificacion(
          activeForm.parentElement.querySelector(".notifications"),
          "error",
          activeName == "new"
            ? "Rellene todos los campos"
            : "No se detectaron cambios",
          0
        );
      }

      if (campos.text && campos.email && campos.checkbox && hayEmail == true) {
        console.log("Pasó");
        toggleForm();
        if (location.pathname.substring(1) == "usuarios.html") {
          crearNotificacion(
            document.querySelector(".container .notifications"),
            "success",
            activeName == "new"
              ? "Usuario creado con exito!"
              : "Los datos del usuario han sido actualizados!",
            0
          );
        } else if (location.pathname.substring(1) == "roles.html") {
          crearNotificacion(
            document.querySelector(".container .notifications"),
            "success",
            activeName == "new"
              ? "Rol creado con exito!"
              : "Rol editado exitosamente!",
            0
          );
        }
      } else {
        crearNotificacion(
          activeForm.parentElement.querySelector(".notifications"),
          "error",
          activeName == "new"
            ? "Rellene todos los campos"
            : "No se detectaron cambios",
          0
        );
      }

      if (
        campos.dir &&
        campos.checkbox &&
        haydir == true &&
        hayNumero == false
      ) {
        console.log("Pasó");
        toggleForm();
      } else {
        crearNotificacion(
          activeForm.parentElement.querySelector(".notifications"),
          "error",
          activeName == "new"
            ? "Rellene todos los campos"
            : "No se detectaron cambios",
          0
        );
      }
      if (campos.select && haySelect == true) {
        console.log("Pasó");
        toggleForm();
      } else {
        crearNotificacion(
          activeForm.parentElement.querySelector(".notifications"),
          "error",
          activeName == "new"
            ? "Rellene todos los campos"
            : "No se detectaron cambios",
          0
        );
      }
      if (campos.number) {
        console.log("Pasó");
        toggleForm();
      } else {
        crearNotificacion(
          activeForm.parentElement.querySelector(".notifications"),
          "error",
          activeName == "new"
            ? "Rellene todos los campos"
            : "No se detectaron cambios",
          0
        );
      }
      if (campos.text && campos.number && hayNumero == true) {
        console.log("Pasó");
        toggleForm();
      } else {
        crearNotificacion(
          activeForm.parentElement.querySelector(".notifications"),
          "error",
          activeName == "new"
            ? "Rellene todos los campos"
            : "No se detectaron cambios",
          0
        );
      }
    });

    if (this.name == "new") {
      toggleForm();
    } else if (this.name == "edit") {
      toggleForm();
    } else if (this.name == "buy") {
      toggleForm();
    } else if (this.name == "detalle") {
      toggleForm();
    }
  };
});

const expresiones = {
  nombres: /^[a-zA-Z]+$/,
  contrasena: /^.{4-12}$/,
  correo: /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{10}$/,
  direcion: /^[a-zA-Z0-9#\s -]+$/,
  numero: /^[0-9]+$/,
};

const campos = {
  text: false,
  email: false,
  checkbox: false,
  dir: false,
  select: false,
  number: false,
};

const validarFormulario = (e) => {
  if (e.target.name != "dir") {
    switch (e.target.type) {
      case "text":
        validarCampo(expresiones.nombres, e.target, "text");
        break;
      case "email":
        validarCampo(expresiones.correo, e.target, "email");
        break;
      case "checkbox":
        validarSlides(e.target, "checkbox");
        break;
      case "select-one":
        ValidarSelect(e.target, "select");

        break;
      case "number":
        validarCampo(expresiones.numero, e.target, "number");
        break;
    }
  } else {
    validarCampo(expresiones.direcion, e.target, "dir");
  }
};

const validarSlides = (slide, campo) => {
  let slides = document.querySelectorAll(
    `.form-${activeName} .slides input[type=checkbox]`
  );
  let checkeados = 0;
  slides.forEach((sl) => {
    if (sl.checked) {
      checkeados++;
    }
  });
  if (checkeados >= 1) {
    campos[campo] = true;
  } else {
    campos[campo] = false;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    // Comprobamos si el input tiene la clase is-danger y la quitamos
    if (input.classList.contains("is-danger")) {
      input.classList.remove("is-danger");
    }
    // Tras quitar la clase is-danger en caso de tenerla ponemos la clase is-succes
    input.classList.add("is-success");
    campos[campo] = true;
  } else {
    // Si no cumple con la expresión regular añadimos la clase is-danger
    input.classList.add("is-danger");
    campos[campo] = false;
  }
};

const ValidarSelect = (input, campo) => {
  if (input.value != 0) {
    campos[campo] = true;
  } else {
    campos[campo] = false;
  }
};

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

// CERRAR NOTIFICACIONES

// document.addEventListener("DOMContentLoaded", () => {
//   (document.querySelectorAll(".notification .delete") || []).forEach(
//     ($delete) => {
//       const $notification = $delete.parentNode;

//       $delete.addEventListener("click", () => {
//         $notification.parentNode.removeChild($notification);
//       });
//     }
//   );
// });
