"use strict";

let magneticContainerElement = document.querySelector(".magnetic-box");
let magneticContainerElementR = new DOMRect();
let magneticElement = document.querySelector(".magnetic-box__content");
let magneticElementR = new DOMRect();
let magneticElementChild = document.querySelector(".magnetic-box__content--child");
let magneticElementChildR = new DOMRect();
// radio of the element
let rW = 0,
  rH = 0,
  rWChild = 0,
  rHChild = 0;
// page coords of center
let oX = 0,
  oY = 0;
let axes = {
  x: 0,
  y: 0,
};
let childAxes = {
  x: 0,
  y: 0,
};
const MAX_MOVEMENT = 10,
  MAX_MOVEMENT_CHILD = 5;

magneticContainerElement.addEventListener("mouseleave", function () {
  // set circle position to the opposite side and then to the center
  // simulating a bouncing effect
  axes.x = -axes.x;
  axes.y = -axes.y;
  childAxes.x = -childAxes.x;
  childAxes.y = -childAxes.y;
  setPos(axes, magneticElement, rW, rH);
  setPos(childAxes, magneticElementChild, rWChild, rHChild);
  setTimeout(() => {
    centerTwoElements();
  }, 300);
});

magneticContainerElement.addEventListener("mousemove", function (e) {
  axes = assignXAndYValue(e, axes, MAX_MOVEMENT);
  childAxes = assignXAndYValue(e, childAxes, MAX_MOVEMENT_CHILD);
  // set circle position
  setPos(axes, magneticElement, rW, rH);
  setPos(childAxes, magneticElementChild, rWChild, rHChild);
});

function setPos(axes, element, rW, rH) {
  element.style.left = axes.x + oX - rW + "px";
  element.style.top = axes.y + oY - rH + "px";
}

// set circle position to center
function centerElement(element, rW, rH) {
  setPos({ x: 0, y: 0 }, element, rW, rH);
}

// set two circles position to center
function centerTwoElements() {
  centerElement(magneticElement, rW, rH);
  centerElement(magneticElementChild, rWChild, rHChild);
}

// check limit to maxMovement
function checkMaxAllowedMovementIsExceeded(pos, maxMovement) {
  return Math.abs(pos) > maxMovement;
}

function assignXAndYValue(e, axes, maxMovement) {
  // 0,0 is at center
  let x = e.clientX - oX;
  let y = e.clientY - oY;
  // limit to maxMovement
  if (checkMaxAllowedMovementIsExceeded(x, maxMovement)) {
    x = x > maxMovement ? maxMovement : -maxMovement;
  }
  if (checkMaxAllowedMovementIsExceeded(y, maxMovement)) {
    y = y > maxMovement ? maxMovement : -maxMovement;
  }
  axes.x = x;
  axes.y = y;

  return axes;
}

function asignar() {
  magneticContainerElementR = magneticContainerElement.getBoundingClientRect();
  magneticElementR = magneticElement.getBoundingClientRect();
  magneticElementChildR = magneticElementChild.getBoundingClientRect();
  // radio of the element
  rW = (magneticElementR.right - magneticElementR.left) / 2;
  rH = (magneticElementR.bottom - magneticElementR.top) / 2;
  // TODO: el centro del child se coloca mal al redimensionar
  rWChild = (magneticElementChildR.right + magneticElementChildR.left) / 2;
  rHChild = (magneticElementChildR.bottom + magneticElementChildR.top) / 2;
  // page coords of center
  oX = (magneticContainerElementR.right + magneticContainerElementR.left) / 2;
  oY = (magneticContainerElementR.bottom + magneticContainerElementR.top) / 2;
}

window.addEventListener("load", () => {
  asignar();
  // set circle position to center
  centerTwoElements();
});
window.addEventListener("resize", () => {
  asignar();
  // set circle position to center
  centerTwoElements();
});
