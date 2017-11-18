var canvas = document.getElementById('canv');

ctx = canvas.getContext('2d');
var line = document.getElementById('line');
var color = document.getElementById('color_inp');


function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
// Visual effects

document.onmousemove = function () {
    if (event.pageY < getCoords(canvas).top + canvas.clientHeight && event.pageY > getCoords(canvas).top && event.pageX > getCoords(canvas).left && event.pageX < getCoords(canvas).left + canvas.clientWidth) {
        console.log()
        pointer.style.width = `${line.value}px`;
        pointer.style.height = `${line.value}px`;
        pointer.style.display = "block";
        pointer.style.left = `${event.pageX - pointer.clientWidth / 2}px`;
        pointer.style.top = `${event.pageY - pointer.clientHeight / 2}px`;
    } else {
        pointer.style.display = "none";

    }
}

document.getElementById('clear-canvas').onclick = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Draw logic
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
            canvas.onmousemove = () => {
                this.style(color.value)
                var mx = event.pageX - canvas.offsetLeft;
                var my = event.pageY - canvas.offsetTop;
                //console.log(mx, my)
                ctx.lineWidth = document.getElementById("line").value;
                ctx.lineTo(mx, my);
                ctx.lineCap = "round";
                // ctx.shadowBlur=1;
                // ctx.shadowColor= color.value;
                ctx.lineJoin = 'round';
                ctx.stroke();
                
            }
            canvas.onmouseup = () => {
                canvas.onmousemove = null;

                ctx.closePath();
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

            ctx.fill();
        },


    }
    circl.draw(document.getElementById("color_inp").value, document.getElementById("line").value)
}