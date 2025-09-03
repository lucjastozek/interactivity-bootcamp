/*
 * IDB Programming: Blank template
 *
 */

// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
  size: 50,
});

// The settings should contain all of the "fixed" parts of your programs, like static HTMLElements and paramaters.
const settings = Object.freeze({
  circle: document.querySelector("#circle"),
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
  const { size } = state;
  let newSize;

  if (size <= 500) {
    newSize = size * 1.1;
  }

  updateState({ ...state, size: newSize });

  setTimeout(update, 50);
}

/**
 * This is where we put the code that outputs our data.
 * use() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function use() {
  const { circle } = settings;
  const { size } = state;

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  window.requestAnimationFrame(use);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
  setTimeout(update, 50);
  window.requestAnimationFrame(use);
}

setup(); // Always remember to call setup()!
