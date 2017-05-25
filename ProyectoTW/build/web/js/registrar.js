$(function() {  
    obtenerPermisos("admin");
    $("#btn-registrar").click(function(e) {
        if(!$("#registrarForm")[0].checkValidity()){
            $("#btn-submit").click();
        }
        else {
            e.preventDefault();
            $.post({
                url: "Registrar",
                data: $("#registrarForm").serialize(),
                success: function(msg, status, jqXHR) {
                    window.location.href="lista.html";
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
});
