/*
 * IDB Programming: Blank template
 *
 */

// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
  hue: 0,
  circles: [],
});

// The settings should contain all of the "fixed" parts of your programs, like static HTMLElements and paramaters.
const settings = Object.freeze({
  initialNumOfCircles: 20,
});

/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {
  state = Object.freeze({ ...state, ...newState });
}

/**
 * This is where we put the code that transforms our data.
 * update() is run every 10 ms, assuming that we keep calling it with `setTimeout`.
 */
function update() {
  setTimeout(update, 50);
}

/**
 * This is where we put the code that outputs our data.
 * use() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function use() {
  const { circles, hue } = state;

  document.body.innerHTML = "";

  for (const circle of circles) {
    circle.element.style.left = `${circle.x}px`;
    circle.element.style.top = `${circle.y}px`;
    circle.element.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    document.body.appendChild(circle.element);
  }

  window.requestAnimationFrame(use);
}

function isOnCircle(x, y, circle) {
  if (x < circle.x - 25 || x > circle.x + 25) {
    return false;
  }

  if (y < circle.y - 25 || y > circle.y + 25) {
    return false;
  }

  return true;
}

/**
 *
 * @param {PointerEvent} event
 */
function handleClick(event) {
  let { circles } = state;
  const notCollidingCircles = [];

  for (const circle of circles) {
    if (!isOnCircle(event.clientX, event.clientY, circle)) {
      notCollidingCircles.push(circle);
    }
  }

  if (notCollidingCircles.length === circles.length) {
    let newCircles = [...circles];

    const circleElement = document.createElement("div");
    circleElement.classList.add("circle");

    const newCircle = {
      x: event.clientX,
      y: event.clientY,
      element: circleElement,
    };

    newCircles.push(newCircle);

    updateState({ ...state, circles: newCircles });
  } else {
    updateState({ ...state, circles: notCollidingCircles });
  }
}

/**
 *
 * @param {PointerEvent} event
 */
function handleMove(event) {
  const pointerPos = {
    x: event.clientX,
    y: event.clientY,
  };

  let newHue = (pointerPos.x / window.innerWidth) * 360;

  updateState({ ...state, hue: newHue });
}

function createCircle() {
  let { circles } = state;
  let newCircles = [...circles];

  const circleElement = document.createElement("div");
  circleElement.classList.add("circle");

  const newCircle = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    element: circleElement,
  };

  newCircles.push(newCircle);

  document.body.appendChild(circleElement);
  updateState({ ...state, circles: newCircles });
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
  const { initialNumOfCircles } = settings;

  for (let i = 0; i < initialNumOfCircles; i++) {
    createCircle();
  }

  setTimeout(update, 50);
  window.requestAnimationFrame(use);
  document.addEventListener("pointerdown", handleClick);
  document.addEventListener("pointermove", handleMove);
}

setup(); // Always remember to call setup()!
