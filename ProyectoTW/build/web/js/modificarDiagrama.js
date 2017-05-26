var puntoA1;
var puntoB1;
var puntoA2;
var puntoB2;
var name;
var p1;
var p2;
var id;
$(function() {
    id = getUrlParameter('id');   
    console.log("Lo primero: "+id);
    obtenerPermisos("admin");
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
            createPlot(name,puntoA1,puntoB1,puntoA2,puntoB2);
        },
        error: function(error) {
            console.log(error);
        }
    });
});


function createPlot(name,puntoA1,puntoB1,puntoA2,puntoB2){
    
    $("#id").val(id);
    $("#name").val(name);
    $("#p1a").val(puntoA1);
    $("#p1b").val(puntoB1);
    $("#p2a").val(puntoA2);
    $("#p2b").val(puntoB2);
    
    var num=parseFloat(puntoA1);
    var num2=parseFloat(puntoB1);
    var num3=parseFloat(puntoA2);
    var num4=parseFloat(puntoB2);
    
    var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, 2, 5, -2], axis:true, grid:true});
    p1 = b.create('point',[num,num2], {name:'A',size:4});
    p2 = b.create('point',[num3,num4], {name:'B',size:4});
    var li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});
    
    
    $("#p1a").on("change keyup", function(event){
        x = parseFloat($("#p1a").val());
        y = parseFloat($("#p1b").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        //createPlot($("#name").val(),$("#p1a").val(),$("#p1b").val(), $("#p2a").val(), $("#p2b").val());
    });
    
    $("#p1b").on("change keyup", function(event){
        x = parseFloat($("#p1a").val());
        y = parseFloat($("#p1b").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        //createPlot($("#name").val(),$("#p1a").val(),$("#p1b").val(), $("#p2a").val(), $("#p2b").val());
    });
    
    $("#p2a").on("change keyup", function(event){
        x = parseFloat($("#p2a").val());
        y = parseFloat($("#p2b").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        //createPlot($("#name").val(),$("#p1a").val(),$("#p1b").val(), $("#p2a").val(), $("#p2b").val());
    });
    
    $("#p2b").on("change keyup", function(event){
        x = parseFloat($("#p2a").val());
        y = parseFloat($("#p2b").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        //createPlot($("#name").val(),$("#p1a").val(),$("#p1b").val(), $("#p2a").val(), $("#p2b").val());
    });

    p1.on('drag', function(){
        $("#p1a").val(p1.coords.usrCoords[1]);
        $("#p1b").val(p1.coords.usrCoords[2]);
    });
    
    p2.on('drag', function(){
        $("#p2a").val(p2.coords.usrCoords[1]);
        $("#p2b").val(p2.coords.usrCoords[2]);
    });

    $("#btn-modifyPlot").click(function(e) {
        e.preventDefault();
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
}

      

function setCoordenadas() {
    var punto1=p1.coords.usrCoords;
    var punto2=p2.coords.usrCoords;
    
    $("#p1a").val(punto1[1]);
    $("#p1b").val(punto1[2]);
    $("#p2a").val(punto2[1]);
    $("#p2b").val(punto2[2]);
}