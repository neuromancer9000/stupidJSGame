var cnvs = document.getElementById("canvas");
var cntx = cnvs.getContext("2d");

// Create new objects
var bird = new Image();
var bgrd = new Image();
var fgrd = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

// Add srcs to objects
bird.src = "img/flappy_bird_bird.png";
bgrd.src = "img/flappy_bird_bg.png";
fgrd.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeDown.src = "img/flappy_bird_pipeDown.png";

// Gap between pipes
var pipeGap = 90;

// Pipe Blocks Array
var pipe = [];
pipe[0] = {
    x : cnvs.width,
    y : 0,
} 

// Bird Position 
var xPos = 10;
var yPos = 150;
var fallSpeed = 2;

// Score count 
var score = 0; 

// Audio files
var fly = new Audio();
var score_audio = new Audio();

// Audio files srcs
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3"; 


// Bird Goes Up Function
document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 25;
    fly.play();
}

// Draw Game
function drawGame() {
    cntx.drawImage(bgrd, 0, 0);
    for (var i = 0; i < pipe.length; i++) {
        cntx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        cntx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + pipeGap);
        pipe[i].x--;
        if (pipe[i].x === 125) {
            pipe.push({
                x : cnvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeDown.height
            });
        }
        // Check collisions 
        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + pipeGap) 
                || yPos + bird.height >= cnvs.height - fgrd.height) {
                    location.reload(); // Reload webpage
                }
        if (pipe[i].x === 5) {
            score++;
            score_audio.play();
        }
    } 
    cntx.drawImage(fgrd, 0, cnvs.height - fgrd.height);
    cntx.drawImage(bird, xPos, yPos);
    yPos += fallSpeed;
    cntx.fillStyle = "#000";
    cntx.font = "24px Helvetica";
    cntx.fillText("Score: " + score, 10, cnvs.height - 20);
    requestAnimationFrame(drawGame);
}

pipeDown.onload = drawGame;