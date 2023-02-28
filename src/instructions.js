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
