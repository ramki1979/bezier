const currentSelection = {};

function validateType(type) {
  if (!type || typeof type !== "string") {
    throw new Error(`Invalid type. Expected string but got '${type}'.`);
  }

  if (!Array.isArray(currentSelection[type])) {
    currentSelection[type] = [];
  }
}

exports.getSelectedOfType = function getSelectedOfType(type) {
  validateType(type);
  return [...currentSelection[type]];
}

exports.addToSelection = function addToSelection(type, id) {
  validateType(type);
  if (currentSelection[type].indexOf(id) < 0) {
    currentSelection[type].push(id);
  }
}

exports.removeFromSelection = function removeFromSelection(type, id) {
  validateType(type);
  const itemIndex = currentSelection[type].indexOf(id);
  if (itemIndex > -1) {
    currentSelection[type].splice(itemIndex, 1);
  }
}

exports.isSelected = function isSelected(type, id) {
  validateType(type);
  return currentSelection[type].indexOf(id) > -1;
}

exports.clearSelection = function clearSelection() {
  const keys = Object.keys(currentSelection);
  for (let i = 0; i < keys.length; i += 1) {
    currentSelection[keys[i]].length = 0; // Emptying out the arrays
  }
}