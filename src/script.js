import { saveAs } from "file-saver";
import { pointsAlongLine } from "./vector.js";
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// ctx.lineJoin = "round";
// ctx.lineCap = "round";
// ctx.lineWidth = 2;

//fill canvas background color
ctx.fillStyle = "#fffcf5";
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
  canvas.toBlob(function (blob) {
    saveAs(blob, "myIMage.png");
  });
});

// clear
document.getElementById("clear").addEventListener("click", () => {
  ctx.fillStyle = "#fffcf5";
  ctx.fillRect(0, 0, canvas.width, canvas.height); //fill canvas background color
});
let mousedown;
let x;
let y;
let lastx;
let lasty;

//randomnumber
function random(size) {
  return (Math.random() - 0.5) * size;
}
function randomP(size) {
  return Math.random() * size;
}
//draw with different open
const penbox = [ink1, ink2, ink3, ink4, ink5, ink6];
let penchosen = penbox[0];
document.querySelectorAll("#pens").forEach((pen) => {
  pen.addEventListener("click", (e) => {
    console.log(penbox[e.target.getAttribute("no")]);
    penchosen = penbox[e.target.getAttribute("no")];
  });
});
function ink1(x, y) {
  let interpolatedPoints = pointsAlongLine(x, y, lastx, lasty, 12);
  interpolatedPoints.forEach((p) => {
    ctx.fillStyle = `rgba( 0, 0,0,0.3)`;
    ctx.beginPath();
    ctx.fillRect(p.x, p.y - 4, 1, 48);
    ctx.fillRect(p.x - 6, p.y + 2, 28, 3);
    ctx.stroke();
  });
}
function ink2(x, y) {
  let interpolatedPoints = pointsAlongLine(x, y, lastx, lasty, 6);
  interpolatedPoints.forEach((p) => {
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.strokeStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.beginPath();
      ctx.arc(p.x + random(10), p.y + random(10), randomP(0.2), 0, 2 * Math.PI);
      ctx.stroke();
    }
  });
}
function ink3(x, y) {
  ctx.fillStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
  ctx.strokeStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.2)`;
  ctx.moveTo(x, y);
  ctx.fillRect(x, y, randomP(10), randomP(80));
}
function ink4(x, y) {
  let interpolatedPoints = pointsAlongLine(x, y, lastx, lasty, 6);
  interpolatedPoints.forEach((p) => {
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.5)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillRect(p.x + random(30), p.y + random(30), 10, 10);
      ctx.stroke();
    }
  });
}
function ink5(x, y) {
  let interpolatedPoints = pointsAlongLine(x, y, lastx, lasty, 2);
  interpolatedPoints.forEach((p) => {
    ctx.strokeStyle = `rgba( ${randomP(255)}, 0,${randomP(255)},0.3)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, Math.PI * randomP(1), Math.PI * randomP(1));
    ctx.stroke();
  });
}
function ink6(x, y) {
  let interpolatedPoints = pointsAlongLine(x, y, lastx, lasty, 2);
  interpolatedPoints.forEach((p) => {
    ctx.strokeStyle = `rgba( 0, 0,0,0.3)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 200, Math.PI * randomP(1), Math.PI * randomP(1));
    ctx.stroke();
  });
}

//drawEvent
canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
});
canvas.addEventListener("mousemove", (e) => {
  if (mousedown == true) {
    penchosen(e.clientX, e.clientY);
  }
  lastx = e.clientX;
  lasty = e.clientY;
});
canvas.addEventListener("mouseup", () => {
  mousedown = false;
});
canvas.addEventListener("mouseout", () => {
  mousedown = false;
});

//touchEvent
canvas.addEventListener("touchstart", (e) => {
  let touches = Array.from(e.touches);
  let touch = touches[0];
  lastx = touch.clientX;
  lasty = touch.clientY;
  penchosen(touch.clientX, touch.clientY);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  let touches = Array.from(e.touches);
  let touch = touches[0];
  penchosen(touch.clientX, touch.clientY);
  lastx = touch.clientX;
  lasty = touch.clientY;
});
canvas.addEventListener("touchend", () => {
  //  lastx = touch.clientX;
  // lasty = touch.clientY;
});
