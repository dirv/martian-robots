export const turnLeft = ({ orientation }) => {
  switch (orientation) {
    case "E":
      return { orientation: "N" };
    case "N":
      return { orientation: "W" };
    case "W":
      return { orientation: "S" };
    case "S":
      return { orientation: "E" };
  }
};

export const turnRight = ({ orientation }) => {
  switch (orientation) {
    case "E":
      return { orientation: "S" };
    case "N":
      return { orientation: "E" };
    case "W":
      return { orientation: "N" };
    case "S":
      return { orientation: "W" };
  }
};

export const moveForwardNoBounds = ({ orientation, x, y }) => {
  switch (orientation) {
    case "N":
      return { x, y: y + 1 };
    case "E":
      return { x: x + 1, y };
    case "S":
      return { x, y: y - 1 };
    case "W":
      return { x: x - 1, y };
  }
};

export const moveForward = (robot, { maxX, maxY }) => {
  const updatedRobot = moveForwardNoBounds(robot);
  const { x, y } = updatedRobot;
  if (x < 0 || x > maxX || y < 0 || y > maxY) {
    return { ...robot, lost: true };
  }
  return updatedRobot;
};
