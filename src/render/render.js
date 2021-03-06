const getContext = require("../canvas/getContext");
const renderConnections = require("./connections/renderConnections");
const renderPoints = require("./points/renderPoints");
const isValidPosition = require("../utils/isValidPosition");
const { getCursor } = require("../utils/cursor");
const { resetGuides } = require("./guides");

const ctxHeight = 800;
const ctxWidth = 800;

let lastPosition;

module.exports = function render(position, opts = {}) {
  const ctx = getContext();
  ctx.clearRect(0, 0, ctxWidth, ctxHeight);

  renderConnections();
  renderPoints();

  resetGuides();

  if (!opts.noPosition) { // Skips all position based draws and checks
    if (!opts.useLastPosition) {
      lastPosition = position;
    } else {
      position = lastPosition;
    }

    if (!isValidPosition(position)) {
      throw new Error("Invalid position.");
    }

    ctx.drawImage(getCursor(), position.x, position.y);
  }
}