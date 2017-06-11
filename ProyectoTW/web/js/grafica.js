var bb1=-5;
var bb2=2;
var bb3=5;
var bb4=-2;

var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [bb1, bb2, bb3, bb4], axis:true, grid:true});
var p1 = b.create('point',[1,1], {name:'A',size:4});
var p2 = b.create('point',[-1,-1], {name:'B',size:4});
var li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});
$("#p1a").val(1);
$("#p1b").val(1);
$("#p2a").val(-1);
$("#p2b").val(-1);

$(function() {
    obtenerPermisos("profesor");
    $("#btn-savePlot").click(function(e) {

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
                    window.location.href="diagramas.html";
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

setGraphListeners();



