var bb1=-5;
var bb2=2;
var bb3=5;
var bb4=-2;
$(function() {
    $("#btn-savePlot").click(function(e) {
        /*
        $("#bb1").val(bb1/b.zoomX);
        $("#bb2").val(bb2/b.zoomY);
        $("#bb3").val(bb3/b.zoomX);
        $("#bb4").val(bb4/b.zoomY);
        */
        //alert(bb1);
        setCoordenadas();
        if(!$("#diagramaForm")[0].checkValidity()){
            $("#btn-submitPlot").click();
        }
        else {
            e.preventDefault();
            $.post({
                url: "GuardarDiagrama",
                data: $("#diagramaForm").serialize(),
                success: function(msg, status, jqXHR) {
                    alert("Diagrama Guardado");
                    window.location.href="home.html";
                    console.log(msg);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });  
});

function setCoordenadas() {
    var punto1=p1.coords.usrCoords;
    var punto2=p2.coords.usrCoords;

    $("#p1a").val(punto1[1]);
    $("#p1b").val(punto1[2]);
    $("#p2a").val(punto2[1]);
    $("#p2b").val(punto2[2]);
    
    $("#bb1").val(bb1/b.zoomX);
    $("#bb2").val(bb2/b.zoomY);
    $("#bb3").val(bb3/b.zoomX);
    $("#bb4").val(bb4/b.zoomY);
}



