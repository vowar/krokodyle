var canvas = document.getElementById('canv');

ctx = canvas.getContext('2d');
line = document.getElementById('line')


// canvas.onclick = function(){
//     var lin = {
//         x: event.pageX,
//         y: event.pageY,
//         fill: function(c){ ctx.strokeStyle = c},
//         widthe: function(w){ctx.lineWidth = w},
//         draw: function(color, wid){
//             this.fill(color);
//             this.widthe(wid)
//             ctx.moveTo(this.x,this.y)
//             ctx.lineTo(100, 100)
//             ctx.stroke()
//         }


//     }/* lin end */
//     lin.draw('green', line.value)
// }



// var line = {
//     x: event.pageX;
//     y: event.pageY;

// }
function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();
  
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  
  }

  document.onmousemove = function(){
      if(event.pageY< getCoords(canvas).top + canvas.clientHeight && event.pageY >getCoords(canvas).top && event.pageX >getCoords(canvas).left && event.pageX <  getCoords(canvas).left + canvas.clientWidth){
        console.log()
        pointer.style.width = `${document.getElementById('line').value}px`;
        pointer.style.height = `${document.getElementById('line').value}px`;
        pointer.style.display = "block";
        pointer.style.left = `${event.pageX - pointer.clientWidth / 2}px`;
        pointer.style.top = `${event.pageY - pointer.clientHeight / 2}px`;
      }else{
        pointer.style.display = "none";
        
      }
  }

canvas.onmousedown = function(){
    
    var line ={
        x: event.pageX,
        y: event.pageY,
        move: function(){moveTo(this.x, this.y)},
        fill: function (c) { ctx.strokeStyle = c },
        draw: function(){
            this.move()
            canvas.onmousemove = () => {
                //console.log(this)
                this.fill(document.getElementById("color_inp").value)
                var mx = event.pageX
                var my = event.pageY
                
                ctx.lineWidth = document.getElementById("line").value;
                ctx.lineTo(mx, my);
                ctx.stroke();
                canvas.onmouseup = ()=>{
                    canvas.onmousemove = null;
                }
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
            ctx.arc(this.x, this.y, circle_width/2, 0, Math.PI * 2);
            //ctx.stroke();

            ctx.fill();
        },


    }
    circl.draw(document.getElementById("color_inp").value, document.getElementById("line").value)
}


//  flag = true;

// canvas.onmousedown = function () {
//     flag = true
//     var x = event.pageX;
//     var y = event.pageY;

//     console.log(x + ":" + y)

//     ctx.moveTo(x, y);

//     canvas.onmousemove = function () {
//         if (flag) {

//         ctx.lineWidth = document.getElementById("line").value;
//         var mx = event.pageX
//         var my = event.pageY
//         ctx.lineTo(mx, my);

//             ctx.stroke();
//         }
//         console.log("move " + mx + ":" + my)
//     }
//     canvas.onmouseup = function () {
//         flag = false

//     }

// }   



        // touch: function (x, y) {
        //     console.log(event.clientY)
        //     console.log(event.pageY)
        //     var isPath = ctx.isPointInPath(x, y);
        //     if (isPath) {
        //         console.log(this);
        //         this.draw('red')
        //     }
        // }