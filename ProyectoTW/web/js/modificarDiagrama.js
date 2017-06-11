var puntoA1;
var puntoB1;
var puntoA2;
var puntoB2;
var name;
var p1;
var p2;
var id;
var bb1=-5;
var bb2=1;
var bb3=5;
var bb4=-1;

$(function() {
    id = getUrlParameter('id');   
    console.log("Lo primero: "+id);
    obtenerPermisos("profesor");
    $.ajax({
        type: "GET",
        url: "ModificarDiagrama",
        data: {id: id},
        success: function(msg, status, jqXHR) {
            console.log(msg);
            name=msg[1];
            puntoA1=msg[2];
            puntoB1=msg[3];
            puntoA2=msg[4];
            puntoB2=msg[5];
            bb1=msg[6];
            bb2=msg[7];
            bb3=msg[8];
            bb4=msg[9];
            createPlot(name,puntoA1,puntoB1,puntoA2,puntoB2,bb1,bb2,bb3,bb4);
        },
        error: function(error) {
            console.log(error);
        }
    });
});


function createPlot(name,puntoA1,puntoB1,puntoA2,puntoB2,bb1,bb2,bb3,bb4){
    //Puntos gráfica
    $("#id").val(id);
    $("#name").val(name);
    $("#p1a").val(puntoA1);
    $("#p1b").val(puntoB1);
    $("#p2a").val(puntoA2);
    $("#p2b").val(puntoB2);
    
    //Puntos (Pendiente)
    $("#x1").val(puntoA1);
    $("#y1").val(puntoB1);
    $("#x2").val(puntoA2);
    $("#y2").val(puntoB2);
    $("#m1").val($("#y2").val()-$("#y1").val());
    $("#m2").val($("#x2").val()-$("#x1").val());
    
    //Puntos (Ecuacion)
    $("#2y1").val(puntoB1);
    $("#2x1").val(puntoA1);
    $("#2m1").val($("#y2").val()-$("#y1").val());
    $("#2m2").val($("#x2").val()-$("#x1").val());

    var num=parseFloat(puntoA1);
    var num2=parseFloat(puntoB1);
    var num3=parseFloat(puntoA2);
    var num4=parseFloat(puntoB2);
    
    
    var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [bb1, bb2, bb3, bb4], axis:true, grid:true});
    p1 = b.create('point',[num,num2], {name:'A',size:4});
    p2 = b.create('point',[num3,num4], {name:'B',size:4});
    var li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});
    
    setGraphListeners();

    $("#btn-modifyPlot").click(function(e) {
        e.preventDefault();
        //Mandamos los valores de la cuadricula
        $("#bb1").val(bb1/b.zoomX);
        $("#bb2").val(bb2/b.zoomY);
        $("#bb3").val(bb3/b.zoomX);
        $("#bb4").val(bb4/b.zoomY);
        console.log("Coordenadas p1: "+p1.coords.usrCoords);
        setCoordenadas();
        if(!$("#diagramamForm")[0].checkValidity()){
            $("#btn-submitmPlot").click();
        }
        else {
            e.preventDefault();
            console.log("Lo envia");
            $.post({
                url: "ModificarDiagrama",
                data: $("#diagramamForm").serialize(),
                success: function(msg, status, jqXHR) {
                    if(msg[0] === "success"){
                        alert("Diagrama Modificado");
                    }
                    if(msg[0] === "error"){
                        alert("No tiene los permisos para modificar");
                    }
                    window.location.href="diagramas.html";
                    console.log(msg);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
}

      

function setCoordenadas() {
    var punto1=p1.coords.usrCoords;
    var punto2=p2.coords.usrCoords;
    
    $("#p1a").val(punto1[1]);
    $("#p1b").val(punto1[2]);
    $("#p2a").val(punto2[1]);
    $("#p2b").val(punto2[2]);
}

function calcularPendiente(){
    var m,x1,x2,y1,y2;
    x1=$("#p1a").val();
    y1=$("#p1b").val();
    x2=$("#p2a").val();
    y2=$("#p2b").val();
    console.log("X1",x1);
    m=(y2-y1)/(x2-x1);
    
    $("#m").val(m);
}