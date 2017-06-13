var bb1=-10;
var bb2=10;
var bb3=10;
var bb4=-10;

var rx1 = parseInt(getRandomInt(0, 10));
var rx2 = parseInt(getRandomInt(0, 10));

var ry1 = parseInt(getRandomInt(0, 10));
var ry2 = parseInt(getRandomInt(0, 10));

var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [bb1, bb2, bb3, bb4], axis:true, grid:true});
var p1 = b.create('point',[rx1,ry1], {name:'A',size:4, fixed: true});
var p2 = b.create('point',[rx2,ry2], {name:'B',size:4, fixed: true});
var li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});

$(function() {
    obtenerPermisos("estudiante"); 
    
    $("#p1a").on("change keyup", function(event) {
       $("#2x1").val($("#p1a").val()); 
    });
    
    $("#p1a").on("change keyup", function(event) {
       $("#2x1").val($("#p1a").val()); 
    });
    
    $("#p1b").on("change keyup", function(event) {
       $("#2y1").val($("#p1b").val()); 
    });
    
    $("#btn-comprobar").click(function(event){
       x1 = parseInt($("#p1a").val());
       y1 = parseInt($("#p1b").val());
       x2 = parseInt($("#p2a").val());
       y2 = parseInt($("#p2b").val());
       m1 = parseInt($("#2m1").val());
       m2 = parseInt($("#2m2").val());
       
       if(rx1 === x1 && rx2 === x2 && ry1 === y1 && ry2 === y2 && m1 === (y2-y1) && m2 === (x2-x1)) {
           console.log("correcto");
       }
       else {
           console.log(x1+ ","+y1);
           console.log(rx1+ ","+ry1);
           console.log(x2+ ","+y2);
           console.log(rx2+ ","+ry2);

       }
       
       
    });
    
});
