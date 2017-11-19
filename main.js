var players = []; 
    document.addEventListener("DOMContentLoaded", function(){
        enterName()
        function enterName(){
            var nick = prompt("Введите никнейм", "");
            if(nick != "" || nick === null){
                var obj = {
                    name: nick,
                    wins: 0
                }
                players = [...players, obj]
                beginGame()
                //console.log(players)
            }else {
                enterName()
            }
        }
    });
var words = [
        {name: "яблоко", type: "существительное"},
        {name: "золото", type: "существительное"},
        {name: "дождь", type: "существительное"},
        {name: "светить", type: "глагол"},
        {name: "гореть", type: "глагол"},
        {name: "плакать", type: "глагол"},
    ];

var chose_panel = document.getElementById("chose-word");
var buttons = document.getElementById("chose_buttons");
var chose_words = [1, 2, 3];

function beginGame(){
    var rand_words = words;
    shuffle(rand_words)
    chose_panel.style.visibility = "";
    chose_panel.style.opacity = "1";
    buttons.innerHTML = "";
    buttons.innerHTML = `
        <button class="chose_btn" data="${rand_words[0].type}">${rand_words[0].name}</button>
        <button class="chose_btn" data="${rand_words[1].type}">${rand_words[1].name}</button>
        <button class="chose_btn" data="${rand_words[2].type}">${rand_words[2].name}</button>`;
    chose_panel.appendChild(buttons)
}

chose_panel.onclick = function(){
    if(event.target.className == "chose_btn"){
        document.getElementById("word-name").innerHTML = `Нарисуйте слово: <b>"${event.target.innerHTML.toUpperCase()}"</b>`;
        document.getElementById("inner_type").innerHTML = event.target.getAttribute("data");
        if(event.target.getAttribute("data")=='глагол'){
            document.getElementById("word-type").style.backgroundColor = "rgb(236,105,109)";
            
        }else if(event.target.getAttribute("data")=="прилагательное"){
            document.getElementById("word-type").style.backgroundColor = "rgb(51, 191, 255)";
        }else{
            document.getElementById("word-type").style.backgroundColor = "rgb(71, 175, 71)";
            
            
        }
        chose_panel.style.visibility = "hidden";
        chose_panel.style.opacity = "0";
    }
}

document.getElementById('inner_type').onclick = function(){
    beginGame()
    
}


var line = document.getElementById("line");
var color = document.getElementById("color_inp");
var color_background = document.getElementById("color_back");
var example = document.getElementById("example__item");

example.style.width = `${line.value}px`
example.style.height = `${line.value}px`
example.style.backgroundColor = `${color.value}`
example.style.marginLeft = `${40 - line.value/2}px`
example.style.marginTop = `${40 - line.value/2}px`

line.oninput  = function(){
    example.style.width = `${line.value}px`
    example.style.height = `${line.value}px`
    example.style.marginLeft = `${40 - line.value/2}px`
    example.style.marginTop = `${40 - line.value/2}px`
    
}
color.onchange = function(){
    example.style.backgroundColor = color.value
}
color_background.onchange = function(){
    canvas.style.backgroundColor = color_background.value
}

var color_line = document.getElementById("chose-colors")
console.log(color_line)

var color_arr = ["rgb(0,0,0)", "rgb(255,255,255)", "#a5a5a5", "#ffd0e2", "#33bfff", "#1c1cff", "#01c622", "#f7e601", "#ffe5b2", "#ff8e00", "#ff0b00", "#6f2c0b"]
for(var i = 0; i <12; i++){
    var block = document.createElement("div");
    block.classList.add("color-item");
    block.style.backgroundColor = `${color_arr[i]}`
    color_line.appendChild(block)
}
color_line.onclick = () => {
    if(event.target.className == "color-item"){
        color.value = `#${getHexRGBColor(event.target.style.backgroundColor)}`
        example.style.backgroundColor = `${event.target.style.backgroundColor}`
    }
}
var send_answer = document.getElementById("answer-btn");
var answer_inp = document.getElementById("answer");
send_answer.onclick = function(){
    if(answer_inp.value != ""){
        var variant = document.createElement("p");
        variant.className = "variant";
        variant.innerHTML = `
            <span class="variant-author">${players[0].name}:</span>
            <span class="main-text">${answer_inp.value}</span>`
        document.getElementById("variants-list").appendChild(variant)
        answer_inp.value = "";
    }
}






















function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getHexRGBColor(color)
{
  color = color.replace(/\s/g,"");
  var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
  if(aRGB){
    color = "";
    for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,"0$1");
  }
  else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, "$1$1$2$2$3$3");
  return color;
}

