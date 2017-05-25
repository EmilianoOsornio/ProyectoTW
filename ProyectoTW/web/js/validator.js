var password = document.getElementById("pass"), confirm_password = document.getElementById("pass_confirm");

function validatePassword(){
  if(password.value !== confirm_password.value) {
    confirm_password.setCustomValidity("Las contraseñas deben ser iguales");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;