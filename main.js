"use strict";

let stickyElement = document.querySelector(".sticky-box__content");
let stickyContainerElement = document.querySelector(".sticky-box");
let stickyElementChild = document.querySelector(".sticky-box__content--child");
let stickyElementChildR = stickyElementChild.getBoundingClientRect();
let stickyContainerElementR = stickyContainerElement.getBoundingClientRect();
let stickyElementR = stickyElement.getBoundingClientRect();
// radio of the element
// TODO: cuando la venta se redimensiona el centro se tiene que volver a cambiar
let rW = (stickyElementR.right - stickyElementR.left) / 2;
let rH = (stickyElementR.bottom - stickyElementR.top) / 2;
// page coords of center
let oX = (stickyContainerElementR.right + stickyContainerElementR.left) / 2;
let oY = (stickyContainerElementR.bottom + stickyContainerElementR.top) / 2;
let axes = {
  x: 0,
  y: 0,
};
let childAxes = {
  x: 0,
  y: 0,
};
const MAX_MOVEMENT = 15;
const MAX_MOVEMENT_CHILD = 7.5;

function setPos(axes, element) {
  element.style.left = axes.x + oX - rW + "px";
  element.style.top = axes.y + oY - rH + "px";
}

// set circle position to center
setPos({ x: 0, y: 0 }, stickyElement);
setPos({ x: 0, y: 0 }, stickyElementChild);

stickyContainerElement.addEventListener("mouseleave", function (e) {
  axes = assignXAndYValue(e, axes, MAX_MOVEMENT);
  childAxes = assignXAndYValue(e, childAxes, MAX_MOVEMENT_CHILD);
  // set circle position to the opposite side and then to the center
  // simulating a bouncing effect
  setPos(axes, stickyElement);
  setPos(ChildAxes, stickyElementChild);
  setTimeout(() => {
    setPos({ x: 0, y: 0 }, stickyElement);
    setPos({ x: 0, y: 0 }, stickyElementChild);
  }, 300);
});

stickyContainerElement.addEventListener("mousemove", function (e) {
  axes = assignXAndYValue(e, axes, MAX_MOVEMENT);
  childAxes = assignXAndYValue(e, childAxes, MAX_MOVEMENT_CHILD);
  // set circle position
  setPos(axes, stickyElement);
  setPos(ChildAxes, stickyElementChild);
});

// check limit to maxMovement
function checkMaxAllowedMovementIsExceeded(pos, maxMovement) {
  return Math.abs(pos) > maxMovement;
}

function assignXAndYValue(e, axes, maxMovement) {
  // 0,0 is at center
  x = e.clientX - oX;
  y = e.clientY - oY;
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
