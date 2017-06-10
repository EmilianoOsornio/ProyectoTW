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

$("#p1a").on("change keyup", function(event){
        x = parseFloat($("#p1a").val());
        y = parseFloat($("#p1b").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#x1").val($("#p1a").val());
        $("#2x1").val($("#p1a").val());
        $("#x2").val($("#p2a").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
  
    
    $("#p1b").on("change keyup", function(event){
        x = parseFloat($("#p1a").val());
        y = parseFloat($("#p1b").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#y1").val($("#p1b").val());
        $("#2y1").val($("#p1b").val());
        $("#y2").val($("#p2b").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#p2a").on("change keyup", function(event){
        x = parseFloat($("#p2a").val());
        y = parseFloat($("#p2b").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        $("#x1").val($("#p1a").val());
        $("#x2").val($("#p2a").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
        b.fullUpdate();
    });
    
    $("#p2b").on("change keyup", function(event){
        x = parseFloat($("#p2a").val());
        y = parseFloat($("#p2b").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#y1").val($("#p1b").val());
        $("#y2").val($("#p2b").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });

    $("#x1").on("change keyup", function(event){
        x = parseFloat($("#x1").val());
        y = parseFloat($("#y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1a").val($("#x1").val());
        $("#2x1").val($("#x1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    $("#x2").on("change keyup", function(event){
        x = parseFloat($("#x2").val());
        y = parseFloat($("#y2").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p2a").val($("#x2").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    $("#y1").on("change keyup", function(event){
        x = parseFloat($("#x1").val());
        y = parseFloat($("#y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1b").val($("#y1").val());
        $("#2y1").val($("#y1").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#y2").on("change keyup", function(event){
        x = parseFloat($("#x2").val());
        y = parseFloat($("#y2").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p2b").val($("#y2").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#2y1").on("change keyup", function(event){
        x = parseFloat($("#2x1").val());
        y = parseFloat($("#2y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1b").val($("#2y1").val());
        $("#y1").val($("#2y1").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#2x1").on("change keyup", function(event){
        x = parseFloat($("#2x1").val());
        y = parseFloat($("#2y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1a").val($("#2x1").val());
        $("#x1").val($("#2x1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    p1.on('drag', function(){
        $("#p1a").val(p1.coords.usrCoords[1]);
        $("#p1b").val(p1.coords.usrCoords[2]);
        $("#x1").val(p1.coords.usrCoords[1]);
        $("#y1").val(p1.coords.usrCoords[2]);
        $("#2y1").val(p1.coords.usrCoords[2]);
        $("#2x1").val(p1.coords.usrCoords[1]);
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    p2.on('drag', function(){
        $("#p2a").val(p2.coords.usrCoords[1]);
        $("#p2b").val(p2.coords.usrCoords[2]);
        $("#x2").val(p2.coords.usrCoords[1]);
        $("#y2").val(p2.coords.usrCoords[2]);
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });



