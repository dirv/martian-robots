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
