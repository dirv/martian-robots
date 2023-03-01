import { EOL } from "os";
import { instructionLookup } from "./instructions.js";
import { processAllRobots } from "./processor.js";

const parseWorldLine = (line) => {
  const [x, y] = line.split(" ");
  return { maxX: parseInt(x, 10), maxY: parseInt(y, 10) };
};

const parseRobot = (line) => {
  const [x, y, orientation] = line.split(" ");
  return { x: parseInt(x, 10), y: parseInt(y, 10), orientation };
};

const parseInstructions = (line) =>
  Array.from(line).map((code) => instructionLookup[code]);

const parseRobots = (robotLines) => {
  const numRobots = robotLines.length / 2;
  return Array.from(Array(numRobots).keys()).map((i) => {
    const startLine = i * 2;
    return {
      robot: parseRobot(robotLines[startLine]),
      instructions: parseInstructions(robotLines[startLine + 1]),
    };
  });
};

const parseInput = (input) => {
  const allLines = input.split(EOL);
  return {
    world: parseWorldLine(allLines[0]),
    robots: parseRobots(allLines.slice(1)),
  };
};

const printRobot = (robot) => {
  if (robot.lost) {
    return `${robot.x} ${robot.y} ${robot.orientation} LOST`;
  } else {
    return `${robot.x} ${robot.y} ${robot.orientation}`;
  }
};

export const runWithInput = (input) => {
  const { robots, world } = parseInput(input);
  return processAllRobots(robots, world).map(printRobot).join(EOL);
};
