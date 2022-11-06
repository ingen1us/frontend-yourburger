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
let allButtons = document.querySelectorAll("button");

allButtons.forEach((btn) => {
  btn.onclick = function () {
    if (this.name != "") {
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
        document
          .querySelector(`.modal-${btn.name}`)
          .classList.remove("is-active");
        isActive = false;
      } else {
        document.querySelector(`.modal-${btn.name}`).classList.add("is-active");
        isActive = true;
      }
    }

    activeInputs.forEach((input) => {
      input.addEventListener("keyup", validarFormulario);
      input.addEventListener("blur", validarFormulario);
    });

    activeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (campos.text && campos.email) {
        toggleForm();
      } else {
      }
    });

    if (this.name == "new") {
      toggleForm();
    } else if (this.name == "edit") {
      toggleForm();
    }
  };
});

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
