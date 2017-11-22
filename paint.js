var canvas = document.getElementById('canv');

ctx = canvas.getContext('2d');
var line_w = document.getElementById("line");
var color = document.getElementById('color_inp');


function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
// Visual effects

window.onmousemove = function () {
    if (event.target != document.getElementById('chose-word') && event.pageY < getCoords(canvas).top + canvas.clientHeight && event.pageY > getCoords(canvas).top && event.pageX > getCoords(canvas).left && event.pageX < getCoords(canvas).left + canvas.clientWidth) {
        console.log()
        pointer.style.width = `${line_w.value}px`;
        pointer.style.height = `${line_w.value}px`;
        pointer.style.display = "block";
        pointer.style.left = `${event.pageX - pointer.clientWidth / 2}px`;
        pointer.style.top = `${event.pageY - pointer.clientHeight / 2}px`;
    } else {
        pointer.style.display = "none";

    }
}



document.getElementById('clear-canvas').onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Draw logic
var coord_array = [];
document.getElementById("back-event").onclick = () => {
    coord_array.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    for (var i = 0; i < coord_array.length; i++) {

        if (coord_array[i].move_coord.length !== 0) {
            ctx.beginPath();
            ctx.lineWidth = coord_array[i].width;
            ctx.strokeStyle = coord_array[i].colr;
            ctx.moveTo(coord_array[i].startX,coord_array[i].startY);
            for(var j = 0;j<coord_array[i].move_coord.length;j++){
                ctx.lineTo(coord_array[i].move_coord[j].x,coord_array[i].move_coord[j].y)
            }
            ctx.stroke(); 
            
        } else {
            ctx.beginPath();
            ctx.arc(coord_array[i].startX, coord_array[i].startY, coord_array[i].width /2, 0, Math.PI * 2);
            ctx.fillStyle = coord_array[i].colr;
            ctx.fill();
        }

         
    }
    console.log(coord_array)
}
var obj ="";

canvas.onmousedown = function () {
    ctx.beginPath()
    //console.log(event)
    var line = {
        x: event.pageX - canvas.offsetLeft,
        y: event.pageY - canvas.offsetTop,
        move: function () { ctx.moveTo(this.x, this.y) },
        style: function (c) { ctx.strokeStyle = c },
        draw: function () {
            this.move()
            var obj = {
            	startX: this.x,
                startY: this.y,
                width: line_w.value,
                colr: color.value,
            	move_coord: [],
            }
            //console.log(obj)
            document.onmousemove = () => {
                this.style(color.value)
                var mx = event.pageX - canvas.offsetLeft;
                var my = event.pageY - canvas.offsetTop;
                obj = {...obj, move_coord: [...obj.move_coord, {x: mx, y: my}]}
                ctx.lineWidth = line_w.value;
                ctx.lineTo(mx, my);
                ctx.lineCap = "round";
                // ctx.shadowBlur=1;
                // ctx.shadowColor= color.value;
                ctx.lineJoin = 'round';
                ctx.stroke();
                
            }
            document.onmouseup = () => {
                document.onmousemove = null;
                coord_array = [...coord_array, obj];
                console.log(coord_array);
                ctx.closePath();
                document.onmouseup = null;
            }
        }
    }
    //console.log(this)
    line.draw()
}



canvas.onclick = function () {
    var circl = {
        x: event.pageX - canvas.offsetLeft,
        y: event.pageY - canvas.offsetTop,
        fill: function (c) { ctx.fillStyle = c },
        draw: function (color, circle_width) {
            //console.log(this)
            this.fill(color);
            ctx.beginPath();
            ctx.arc(this.x, this.y, circle_width / 2, 0, Math.PI * 2);
            //ctx.stroke();
            ctx.closePath()
            ctx.fill();
        },


    }
    circl.draw(document.getElementById("color_inp").value, line_w.value)
}