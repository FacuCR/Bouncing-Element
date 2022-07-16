"use strict";

let stickyElement = document.querySelector(".sticky-box__content");
let stickyContainerElement = document.querySelector(".sticky-box");
let stickyContainerElementR = stickyContainerElement.getBoundingClientRect();
let stickyElementR = stickyElement.getBoundingClientRect();
// radio of the element
let rW = (stickyElementR.right - stickyElementR.left) / 2;
let rH = (stickyElementR.bottom - stickyElementR.top) / 2;
// page coords of center
let oX = (stickyContainerElementR.right + stickyContainerElementR.left) / 2;
let oY = (stickyContainerElementR.bottom + stickyContainerElementR.top) / 2;
let x, y;

let maxMovement = 15;

function setPos(x, y) {
  stickyElement.style.left = x + oX - rW + "px";
  stickyElement.style.top = y + oY - rH + "px";
}

setPos(0, 0);

stickyContainerElement.addEventListener("mouseleave", function (e) {
  assignXAndYValue(e);
  // set circle position to the opposite side and then to the center
  // simulating a bouncing effect
  setPos(-x, -y);
  setTimeout(() => {
    setPos(0, 0);
  }, 300);
});

stickyContainerElement.addEventListener("mousemove", function (e) {
  assignXAndYValue(e);
  // set circle position
  setPos(x, y);
});


// check limit to maxMovement
function checkMaxAllowedMovementIsExceeded(pos) {
  return Math.abs(pos) > maxMovement;
}

function assignXAndYValue(e) {
  // 0,0 is at center
  x = e.clientX - oX;
  y = e.clientY - oY;
  // limit to maxMovement
  if (checkMaxAllowedMovementIsExceeded(x)) {
    x = x > maxMovement ? maxMovement : -maxMovement;
  }
  if (checkMaxAllowedMovementIsExceeded(y)) {
    y = y > maxMovement ? maxMovement : -maxMovement;
  }
}










let stickyElementSecondary = document.querySelector(".sticky-box__content--secondary");
let stickyElementSecondaryR = stickyElementSecondary.getBoundingClientRect();
// radio of the element
let rWSecondary = (stickyElementSecondaryR.right + stickyElementSecondaryR.left - 20) / 2;
let rHSecondary = (stickyElementSecondaryR.bottom + stickyElementSecondaryR.top - 20) / 2;
let xSecondary, ySecondary;

let maxMovementSecondary = 7.5;

function setPosSecondary(x, y) {
  stickyElementSecondary.style.left = x + oX - rWSecondary + "px";
  stickyElementSecondary.style.top = y + oY - rHSecondary + "px";
}

setPosSecondary(0, 0);

stickyContainerElement.addEventListener("mouseleave", function (e) {
  assignXAndYSecondaryValue(e);
  // set circle position to the opposite side and then to the center
  // simulating a bouncing effect
  setPosSecondary(-xSecondary, -ySecondary);
  setTimeout(() => {
    setPosSecondary(0, 0);
  }, 300);
});

stickyContainerElement.addEventListener("mousemove", function (e) {
  assignXAndYSecondaryValue(e);
  // set circle position
  setPosSecondary(xSecondary, ySecondary);
});


function setPosSecondary(x, y) {
  stickyElementSecondary.style.left = x + oX - rWSecondary + "px";
  stickyElementSecondary.style.top = y + oY - rHSecondary + "px";
}

function assignXAndYSecondaryValue(e) {
  // 0,0 is at center
  xSecondary = e.clientX - oX;
  ySecondary = e.clientY - oY;
  // limit to maxMovement
  if (checkMaxAllowedMovementSecondaryIsExceeded(xSecondary)) {
    xSecondary = xSecondary > maxMovementSecondary ? maxMovementSecondary : -maxMovementSecondary;
  }
  if (checkMaxAllowedMovementSecondaryIsExceeded(ySecondary)) {
    ySecondary = ySecondary > maxMovementSecondary ? maxMovementSecondary : -maxMovementSecondary;
  }
}

function checkMaxAllowedMovementSecondaryIsExceeded(pos) {
  return Math.abs(pos) > maxMovementSecondary;
}