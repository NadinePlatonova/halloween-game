const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const angel = new Image();
const bg = new Image();
const fg = new Image();
const armUp = new Image();
const armBottom = new Image();

// Add sound files
const fly = new Audio();
const score_sound = new Audio();

fly.src = "audio/fly.mp3";
score_sound.src = "audio/score.mp3";


angel.src = "img/angel.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
armUp.src = "img/armUp.png";
armBottom.src = "img/armBottom.png";

const GAP_BETWEEN_ARMS = 90;
const INTERVAL_FOR_NEW_ARM_ARRIVING = 80;
const INTERVAL_FOR_ANGEL_MOVING_UP_AFTER_CLICK = 35;

let score = 0;

// Angel position
let xPos = 10;
let yPos = 150;
let grav = 1.5;

// When clicking any button
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= INTERVAL_FOR_ANGEL_MOVING_UP_AFTER_CLICK;
    fly.play();
}

// Blocks creation
let arm = [];

arm[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < arm.length; i++) {
        ctx.drawImage(armUp, arm[i].x, arm[i].y);
        ctx.drawImage(armBottom, arm[i].x, arm[i].y + armUp.height + GAP_BETWEEN_ARMS);

        arm[i].x--;

        if(arm[i].x == INTERVAL_FOR_NEW_ARM_ARRIVING) {
            arm.push({
                x: cvs.width,
                y: Math.floor(Math.random() * armUp.height) - armUp.height
            });
        }
        // If angel faces with arms
        if(xPos + angel.width >= arm[i].x
            && xPos <= arm[i].x + armUp.width
            && (yPos <= arm[i].y + armUp.height 
            || yPos + angel.height >= arm[i].y + armUp.height + GAP_BETWEEN_ARMS) 
            || yPos + angel.height >= cvs.height - fg.height) {
                    location.reload(); //Reload the page
        }

        if(arm[i].x == 5) {
            score++;
            score_sound.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(angel, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#fff";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

armBottom.onload = draw;