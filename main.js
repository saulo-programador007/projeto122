x = 0;
y = 0;

screen_width=0;
screen_height=0;

apple=""

speakData=""

toNumber=""

drawApple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload() {
  apple=loadImage("apple.png")
}


function start()
{
  document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content; 

    to_number=Number(content);

    if (Number.isInteger(to_number)) {
      drawApple="set"
      document.getElementById("status").innerHTML="A maçã começou a ser desenhada."
    }

}

function setup() {
    screen_width=window.innerWidth;
    screen_height=window.innerHeight;

    canvas=createCanvas(screen_width, screen_height-150);
    canvas.position(0,150);
}

function draw() {
  if(drawApple == "set")
  {
    for (var i = 1; i < to_number; i++) {
      x=Math.floor(Math.random()*700);
      y=Math.floor(Math.random()*400);
      image(apple, x, y, 50, 50);
      
    }

    document.getElementById("status").innerHTML = toNumber + " maçãs desenhadas";
    speak_data=to_number+"maçãs desenhadas";
    speak();
    drawApple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakData);

    synth.speak(utterThis);

    speakData = "";
}
