import { describe, it, expect } from "vitest";
import { processRobot, processAllRobots } from "./processor.js";
import { moveForward, turnRight } from "./instructions.js";

const exampleRobot = { x: 0, y: 0, orientation: "N" };
const exampleWorld = { maxX: 2, maxY: 2 };

describe("processRobot", () => {
  it("returns the starting robot if there are no instructions", () => {
    expect(processRobot(exampleRobot, exampleWorld, [], [])).toContain({
      robot: exampleRobot,
    });
  });

  it("can process a single instruction", () => {
    const instructions = [moveForward];
    const result = processRobot(exampleRobot, exampleWorld, [], instructions);
    expect(result.robot.y).toEqual(exampleRobot.y + 1);
  });

  it("can process two instructions following on from each other", () => {
    const instructions = [moveForward, moveForward];
    const result = processRobot(exampleRobot, exampleWorld, [], instructions);
    expect(result.robot.y).toEqual(exampleRobot.y + 2);
  });

  it("returns the same scents by default", () => {
    const scents = [{ x: 2, y: 2 }];
    const result = processRobot(exampleRobot, exampleWorld, scents, []);
    expect(result.scents).toEqual(scents);
  });

  it("returns a scent if the robot is lost", () => {
    const edgeRobot = { x: 0, y: exampleWorld.maxY, orientation: "N" };
    const instructions = [moveForward];
    const result = processRobot(edgeRobot, exampleWorld, [], instructions);
    expect(result.scents).toEqual([{ x: 0, y: exampleWorld.maxY }]);
  });

  it("does not continue if a robot is lost along the way", () => {
    const edgeRobot = { x: 0, y: exampleWorld.maxY, orientation: "N" };
    const instructions = [moveForward, turnRight, moveForward];
    const result = processRobot(edgeRobot, exampleWorld, [], instructions);
    expect(result.robot).toContain({
      x: 0,
      y: exampleWorld.maxY,
      lost: true,
    });
  });

  it("ignores an instruction that would lose the robot if there is a scent to alert", () => {
    const edgeRobot = { x: 0, y: exampleWorld.maxY, orientation: "N" };
    const scents = [{ x: 0, y: exampleWorld.maxY }];
    const instructions = [moveForward, turnRight, moveForward];
    const result = processRobot(edgeRobot, exampleWorld, scents, instructions);
    expect(result.robot).toContain({
      x: 1,
      y: exampleWorld.maxY,
    });
  });

  it("does not ignore a loss instrution if the scent is for a different location", () => {
    const edgeRobot = { x: 0, y: exampleWorld.maxY, orientation: "N" };
    const scents = [{ x: 1, y: exampleWorld.maxY }];
    const instructions = [moveForward, turnRight, moveForward];
    const result = processRobot(edgeRobot, exampleWorld, scents, instructions);
    expect(result.robot.lost).toEqual(true);
  });

  it("adds a second scent to the returned scent array if there was one already", () => {
    const edgeRobot = { x: 0, y: exampleWorld.maxY, orientation: "N" };
    const scents = [{ x: 1, y: exampleWorld.maxY }];
    const instructions = [moveForward, turnRight, moveForward];
    const result = processRobot(edgeRobot, exampleWorld, scents, instructions);
    expect(result.scents).toHaveLength(2);
  });
});

describe("processAllRobots", () => {
  it("returns no robots if none are provided", () => {
    expect(processAllRobots([], exampleWorld)).toEqual([]);
  });

  it("returns the final position when processing a single robot", () => {
    const result = processAllRobots(
      [{ robot: exampleRobot, instructions: [moveForward] }],
      exampleWorld
    );
    expect(result).toEqual([{ x: 0, y: 1, orientation: "N" }]);
  });

  it("returns the final positions when processing two robots", () => {
    const result = processAllRobots(
      [
        { robot: exampleRobot, instructions: [moveForward] },
        { robot: exampleRobot, instructions: [turnRight] },
      ],
      exampleWorld
    );
    expect(result).toEqual([
      { x: 0, y: 1, orientation: "N" },
      { x: 0, y: 0, orientation: "E" },
    ]);
  });

  it("avoids losing a second robot if a first lost robot left a scent", () => {
    const edgeRobot = { x: 0, y: exampleWorld.maxY, orientation: "N" };
    const result = processAllRobots(
      [
        {
          robot: edgeRobot,
          instructions: [moveForward, turnRight, moveForward],
        },
        {
          robot: edgeRobot,
          instructions: [moveForward, turnRight, moveForward],
        },
      ],
      exampleWorld
    );
    expect(result).toEqual([
      expect.objectContaining({ x: 0, y: exampleWorld.maxY, lost: true }),
      expect.objectContaining({ x: 1, y: exampleWorld.maxY }),
    ]);
  });
});
