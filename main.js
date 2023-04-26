document.addEventListener("DOMContentLoaded", function () {
  const email = {
    nombre: "",
    telefono: "",
    email: "",
    emailCC: "",
    asunto: "",
    mensaje: "",
  };
  let copiaEmail ={

  }

 
  // console.log(email)

  const inputNombre = document.getElementById("nombre");
  const inputTelefono = document.getElementById("telefono");
  const inputEmail = document.getElementById("email");
  const inputEmailCC = document.getElementById("emailCC");
  const inputAsunto = document.getElementById("asunto");
  const inputMensaje = document.getElementById("mensaje");

  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  //   console.log(btnSubmit);
  const formulario = document.getElementById("formulario");
  const spinner = document.getElementById("spinner");

  // Asignar Eventos
  // Para que sea en tiempo real
  //   inputNombre.addEventListener("input", validar);

  inputNombre.addEventListener("input", validar);
  inputTelefono.addEventListener("input", validar);
  inputEmail.addEventListener("input", validar);
  inputEmailCC.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.remove("spinner--hidden");
    setTimeout(() => {
      spinner.classList.add("spinner--hidden");
      // Reiniciar el objeto
      resetFormulario();

      //Crear Alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("alert__success");
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {

    if(e.target.value.trim() ==='' && e.target.id != 'emailCC'  ){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        email[e.target.id] = "";
        comprobarEmail();
        return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta(`El email no es valido `, e.target.parentElement);
      email[e.target.id] = "";
      // Comprobar Email 
      comprobarEmail();
      return;
    }  

      if (e.target.id === "emailCC" && !validarEmail(e.target.value)&& e.target.value !='' ) {
        mostrarAlerta(`El email no es valido `, e.target.parentElement);
        email[e.target.id] =e.target.value;
        
        comprobarEmail();
        return;
      }
      if (e.target.id === "emailCC" && e.target.value =='' ) {
        email[e.target.id] = "";

        comprobarEmail();
        limpiarAlerta(e.target.parentElement);
        return;
      }
    
   

    limpiarAlerta(e.target.parentElement);

    // Asignar los valores


    email[e.target.id] = e.target.value.trim().toLowerCase();

    // Comprobar Email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    //Comprueba si ya existe una alerta
    limpiarAlerta(referencia);

    //Gemerar Alerta en HTML
    const error = document.createElement("P");

    error.textContent = mensaje;
    error.classList.add("formulario__alert");

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    //comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".formulario__alert");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    

   
    const copiaEmail = Object.assign({}, email);
    
    if (copiaEmail.emailCC =='') {
       delete copiaEmail.emailCC; 
    }else if (!validarEmail(copiaEmail.emailCC)) {
      copiaEmail.emailCC ='';
    }
    
    
    console.log(copiaEmail)
    console.log(email)
    if (Object.values(copiaEmail).includes("")) {
     
      btnSubmit.classList.add("formulario__cta--disabled");
      btnSubmit.disabled = true;
    
      return;
     }
     
  
    btnSubmit.classList.remove("formulario__cta--disabled");
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    // Reiniciar el objeto
    email.nombre = "";
    email.telefono = "";
    email.email = "";
    email.emailCC = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
