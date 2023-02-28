const hasScent = ({ x, y }, scents) =>
  scents.find((scent) => scent.x === x && scent.y === y);

const addScent = ({ x, y }, scents) => [...scents, { x, y }];

export const processRobot = (startingRobot, world, scents, instructions) =>
  instructions.reduce(
    ({ robot, scents }, instruction) => {
      if (robot.lost) {
        return { robot, scents };
      }

      const updatedRobot = { ...robot, ...instruction(robot, world) };
      if (updatedRobot.lost && hasScent(robot, scents)) {
        return { robot, scents };
      } else if (updatedRobot.lost) {
        return {
          robot: updatedRobot,
          scents: addScent(robot, scents),
        };
      } else {
        return { robot: updatedRobot, scents };
      }
    },
    { robot: startingRobot, scents }
  );

export const processAllRobots = (robotsPositionsAndInstructions, world) =>
  robotsPositionsAndInstructions.reduce(
    ({ finalRobots, scents }, { robot, instructions }) => {
      const { robot: finalRobot, scents: updatedScents } = processRobot(
        robot,
        world,
        scents,
        instructions
      );
      return {
        finalRobots: [...finalRobots, finalRobot],
        scents: updatedScents,
      };
    },
    { finalRobots: [], scents: [] }
  ).finalRobots;
