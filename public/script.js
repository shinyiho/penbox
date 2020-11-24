import { saveAs } from "file-saver";
import { pointsAlongLine } from "./vector.js";
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.7;
const ctx = canvas.getContext("2d");

// ctx.lineJoin = "round";
// ctx.lineCap = "round";
// ctx.lineWidth = 2;


//fill canvas background color
ctx.fillStyle = "#d16478";
ctx.fillRect(0, 0, canvas.width, canvas.height); //fill canvas background color

// //draw a line
// ctx.moveTo(0, 0);
// ctx.lineTo(100, 100);
// ctx.stroke();

// // draw a circle
// ctx.beginPath();
// ctx.arc(195, 250, 40, 0, 2 * Math.PI);
// ctx.stroke();

// //draw a rec
// ctx.fillStyle = "coral";
// ctx.fillRect(230, 210, 150, 80);

//save Img
document.getElementById("download").addEventListener("click", () => {
  canvas.toBlob(function(blob) {
    saveAs(blob, "myIMage.png");
  });
});

// clear
document.getElementById("clear").addEventListener("click", () => {
 ctx.fillStyle = "#d16478";
ctx.fillRect(0, 0, canvas.width, canvas.height); //fill canvas background color

});

let mousedown;
let x;
let y;

//randomnumber
function random(size) {
  return (Math.random() - 0.5) * size;
}
function randomP(size) {
  return Math.random() * size;
}
//pen box
const penbox = [ink1, ink2,ink3,ink4,ink5,ink6];
let penchosen = penbox[0];
document.querySelectorAll("#pens").forEach(pen => {
  pen.addEventListener("click", e => {
    console.log(penbox[e.target.getAttribute("no")]);
    penchosen = penbox[e.target.getAttribute("no")];
  });
});

function ink3(e) {
 ctx.fillStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.strokeStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.2)`;
  ctx.moveTo(x , y);
  x = e.clientX;
  y = e.clientY;
  
  ctx.fillRect(x, y, randomP(10), randomP(80));
}
function ink2(e) {
  let interpolatedPoints = pointsAlongLine(e.clientX, e.clientY, x, y, 6);
  interpolatedPoints.forEach(p => {
    // console.log(x);
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.strokeStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.beginPath();
      ctx.arc(p.x + random(44), p.y + random(24), randomP(0.2), 0, 2 * Math.PI);
      ctx.stroke();
    }
    x = e.clientX;
    y = e.clientY;
  });
}
function ink4(e) {
  let interpolatedPoints = pointsAlongLine(e.clientX, e.clientY, x, y, 6);
  interpolatedPoints.forEach(p => {
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.beginPath();
      ctx.arc(p.x , p.y , 3, 0, 2 * Math.PI);
        ctx.fill();
      ctx.beginPath();
      ctx.fillRect(p.x+random(30) , p.y+random(30) , 10, 10);
      ctx.stroke();
    }
    x = e.clientX;
    y = e.clientY;
  });
}
function ink5(e) {
  let interpolatedPoints = pointsAlongLine(e.clientX, e.clientY, x, y, 2);
  interpolatedPoints.forEach(p => {
      ctx.strokeStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.3)`;
      ctx.beginPath();
      ctx.arc(p.x , p.y , 4, Math.PI*randomP(1), Math.PI*randomP(1));
      ctx.stroke();
    x = e.clientX;
    y = e.clientY;
  });
}
function ink6(e) {
  let interpolatedPoints = pointsAlongLine(e.clientX, e.clientY, x, y, 2);
  interpolatedPoints.forEach(p => {
      ctx.strokeStyle = `rgba( 0, 0,0,0.3)`;
      ctx.beginPath();
      ctx.arc(p.x , p.y , 400, Math.PI*randomP(1), Math.PI*randomP(1));
      ctx.stroke();
    x = e.clientX;
    y = e.clientY;
  });
}
function ink1(e) {
  let interpolatedPoints = pointsAlongLine(e.clientX, e.clientY, x, y, 12);
  interpolatedPoints.forEach(p => {
      ctx.fillStyle = `rgba( 0, 0,0,0.3)`;
      ctx.beginPath();
      ctx.fillRect(p.x, p.y-4 , 1, 48);
     ctx.fillRect(p.x-6, p.y+2 , 28, 3);
      ctx.stroke();
    x = e.clientX;
    y = e.clientY;
  });
}
//draw
canvas.addEventListener("mousedown", e => {
  mousedown = true;
  x = e.clientX;
  y = e.clientY;
});

canvas.addEventListener("mousemove", e => {
  if (mousedown == true) {
    penchosen(e);
  }
});

canvas.addEventListener("mouseup", () => {
  mousedown = false;
});

canvas.addEventListener("mouseout", () => {
  mousedown = false;
});


