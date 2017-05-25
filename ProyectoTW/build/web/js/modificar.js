$(function() {
    var id = getUrlParameter('id');   
    console.log(id);
    obtenerPermisos("admin");
    $.ajax({
        type: "GET",
        url: "Modificar",
        data: {id: id},
        success: function(msg, status, jqXHR) {
            console.log(msg);
            setVariables(msg);
        },
        error: function(error) {
            console.log(error);
        }
    });
    $("#btn-modificar").click(function(e) {
        if(!$("#modificarForm")[0].checkValidity()){
            $("#btn-submit").click();
        }
        else {
            e.preventDefault();
            $.post({
                url: "ModificarUsuario",
                data: $("#modificarForm").serialize(),
                success: function(msg, status, jqXHR) {
                    window.location.href="lista.html";
                    alert("Usuario Modificado");
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });  
});

function setVariables(msg) {
    $("#id").val(msg[0]);
    $("#usuario").val(msg[1]);
    $("#correo").val(msg[2]);
    $("#tipo").val(msg[3]);
}


