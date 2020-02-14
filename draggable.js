const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 350;

let dragging = false;
const cWidth = canvas.width,
    cHeight = canvas.height;

// Start pos of mouse //
let startX = null;
let startY = null;

const baloon = new Image();
const imgArr = [
    {
        image: baloon,
        x: 0,
        y: 0,
        w: 150,
        h: 240
    }
];

// Position of canvas relative to parent element //
const offsetX = canvas.offsetLeft,
    offsetY = canvas.offsetTop;

baloon.onload = function (){
    let img = imgArr[0];
    ctx.drawImage(img.image, img.x, img.y, img.w, img.h);
};
baloon.src = "loon.png";

function isMouseInImg (mousePosX, mousePosY, objToMove) {

    if (mousePosX > objToMove.x && mousePosX < objToMove.x + objToMove.w &&
        mousePosY > objToMove.y && mousePosY < objToMove.y + objToMove.h) {
        dragging = true;
    }
}

function handleMouseDown (e) {
    let img = imgArr[0];
    // Current mouse pos //
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    isMouseInImg(startX, startY, img);
}

function handleMouseMove (e) {
    let img = imgArr[0];
    // Current mouse pos //
    mouseX = e.clientX - offsetX;
    mouseY = e.clientY - offsetY;
    // How much has mouse moved from prev pos //
    let dx = mouseX - startX;
    let dy = mouseY - startY;

    if (dragging) {
        img.x += dx;
        img.y += dy;
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img.image, img.x, img.y, 150, 240);
    }
    startX = mouseX;
    startY = mouseY;
}

function handleMouseUp () {
    dragging = false;
}

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);