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
                console.log(msg);
                $("#helpBlock").remove();
                $(".form-group").addClass("has-error");
                $("#passwordInput").append('<span id="helpBlock" class="help-block">Usuario o contraseña incorrectos</span>');
            }
            else {
                console.log(msg);
                if(msg[1] === "admin") {
                    window.location.href = "lista.html";
                }
                if(msg[1] === "profesor") {
                    window.location.href = "diagramas.html";
                }
                else {
                    window.location.href = "home.html";
                }
            }
        }
    });
});

$("#btn-usuarios").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "Obtener",
        success: function(msg, status, jqXHR) {
            console.log(msg);
            $("#lista").empty();
            for(i= 0; i<msg[0].length;i++) {
                $("#lista").append("<h1>"+msg[1][i] +"."+ msg[0][i]+"</h1>");
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});