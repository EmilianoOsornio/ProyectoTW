$(function(){
   isLoggedIn();
});

$("#btn-submit").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "Login",
        data: $("#loginForm").serialize(),
        success: function(msg, status, jqXHR) {
            console.log(msg);
            if(msg[0] === "error") {
                //console.log(msg);
                $("#helpBlock").remove();
                $(".form-group").addClass("has-error");
                $("#passwordInput").append('<span id="helpBlock" class="help-block">Usuario o contraseña incorrectos</span>');
            }
            else {
                console.log(msg[1]);
                if(msg[1] === "admin") {
                    window.location.href = "lista.html";
                }
                else if(msg[1] === "profesor") {
                    window.location.href = "diagramas.html";
                }
                else if(msg[1] === "estudiante") {
                    window.location.href = "juego.html";
                }
            }
        }
    });
});