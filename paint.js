var canvas = document.getElementById('canv');

ctx = canvas.getContext('2d');
line = document.getElementById('line')

function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

document.onmousemove = function () {
    if (event.pageY < getCoords(canvas).top + canvas.clientHeight && event.pageY > getCoords(canvas).top && event.pageX > getCoords(canvas).left && event.pageX < getCoords(canvas).left + canvas.clientWidth) {
        console.log()
        pointer.style.width = `${document.getElementById('line').value}px`;
        pointer.style.height = `${document.getElementById('line').value}px`;
        pointer.style.display = "block";
        pointer.style.left = `${event.pageX - pointer.clientWidth / 2}px`;
        pointer.style.top = `${event.pageY - pointer.clientHeight / 2}px`;
    } else {
        pointer.style.display = "none";

    }
}

canvas.onmousedown = function () {
    ctx.beginPath()
    console.log(event)
    var line = {
        x: event.pageX,
        y: event.pageY,
        move: function () { ctx.moveTo(this.x, this.y) },
        style: function (c) { ctx.strokeStyle = c },
        draw: function () {
            this.move()
            canvas.onmousemove = () => {
                this.style(document.getElementById("color_inp").value)
                var mx = event.pageX
                var my = event.pageY
                //console.log(mx, my)
                ctx.lineWidth = document.getElementById("line").value;
                ctx.lineTo(mx, my);
                ctx.lineCap = "round";
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
        x: event.pageX,
        y: event.pageY,
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