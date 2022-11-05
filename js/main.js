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

// ACTIVACION FORMULARIO
function toggleEdit() {
  if (document.querySelector(".modal-edit").classList.contains("is-active")) {
    document.querySelector(".form-edit").reset();
    campos["text"] = false;
    campos["email"] = false;
    document.querySelector(".modal-edit").classList.remove("is-active");
  } else {
    document.querySelector(".modal-edit").classList.add("is-active");
  }
}

function toggleNew() {
  if (document.querySelector(".modal-new").classList.contains("is-active")) {
    document.querySelector(".form-new").reset();
    campos["text"] = false;
    campos["email"] = false;
    document.querySelector(".modal-new").classList.remove("is-active");
  } else {
    document.querySelector(".modal-new").classList.add("is-active");
  }
}

// VALIDACIONES FORMULARIO
const formularioN = document.querySelector(".form-new");
const inputsN = document.querySelectorAll(".form-new input");

const formularioE = document.querySelector(".form-edit");
const inputsE = document.querySelectorAll(".form-edit input");

const expresiones = {
  nombres: /^[a-zA-Z]+$/,
  contrasena: /^.{4-12}$/,
  correo: /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{10}$/,
};

const campos = {
  text: false,
  email: false,
};

const validarFormulario = (e) => {
  switch (e.target.type) {
    case "text":
      validarCampo(expresiones.nombres, e.target, "text");
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, "email");
      break;
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

// FORMULARIO DE CREAR

inputsN.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formularioN.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.text && campos.email) {
    toggleNew();
  } else {
  }
});

// FORMULARIO DE EDITAR

inputsE.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formularioE.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.text && campos.email) {
    toggleEdit();
  } else {
  }
});
