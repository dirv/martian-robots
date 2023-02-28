import { describe, it, expect } from "vitest";
import { moveForward, turnLeft, turnRight } from "./instructions.js";

describe("turnLeft", () => {
  it("turns to N if current orientation is E", () => {
    expect(turnLeft({ orientation: "E" })).toContain({ orientation: "N" });
  });

  it("turns to W if current orientation is N", () => {
    expect(turnLeft({ orientation: "N" })).toContain({ orientation: "W" });
  });

  it("turns to S if current orientation is W", () => {
    expect(turnLeft({ orientation: "W" })).toContain({ orientation: "S" });
  });

  it("turns to E if current orientation is S", () => {
    expect(turnLeft({ orientation: "S" })).toContain({ orientation: "E" });
  });
});

describe("turnRight", () => {
  it("turns to S if current orientation is E", () => {
    expect(turnRight({ orientation: "E" })).toContain({ orientation: "S" });
  });

  it("turns to E if current orientation is N", () => {
    expect(turnRight({ orientation: "N" })).toContain({ orientation: "E" });
  });

  it("turns to N if current orientation is W", () => {
    expect(turnRight({ orientation: "W" })).toContain({ orientation: "N" });
  });

  it("turns to W if current orientation is S", () => {
    expect(turnRight({ orientation: "S" })).toContain({ orientation: "W" });
  });
});

describe("moveForward", () => {
  const world = { maxX: 5, maxY: 5 };

  it("moves to 1,2 if position is 1,1 and orientation is N", () => {
    const robot = { orientation: "N", x: 1, y: 1 };
    expect(moveForward(robot, world)).toContain({ x: 1, y: 2 });
  });

  it("moves to 2,1 if position is 1,1 and orientation is E", () => {
    const robot = { orientation: "E", x: 1, y: 1 };
    expect(moveForward(robot, world)).toContain({ x: 2, y: 1 });
  });

  it("moves to 1,0 if position is 1,1 and orientation is S", () => {
    const robot = { orientation: "S", x: 1, y: 1 };
    expect(moveForward(robot, world)).toContain({ x: 1, y: 0 });
  });

  it("moves to 0,1 if position is 1,1 and orientation is W", () => {
    const robot = { orientation: "W", x: 1, y: 1 };
    expect(moveForward(robot, world)).toContain({ x: 0, y: 1 });
  });

  it("does not move if the robot would go off the north edge", () => {
    const robot = { orientation: "N", x: 1, y: world.maxY };
    expect(moveForward(robot, world)).toContain({ x: 1, y: world.maxY });
  });

  it("does not move if the robot would go off the east edge", () => {
    const robot = { orientation: "E", x: world.maxX, y: 1 };
    expect(moveForward(robot, world)).toContain({ x: world.maxX, y: 1 });
  });

  it("does not move if the robot would go off the south edge", () => {
    const robot = { orientation: "S", x: 1, y: 0 };
    expect(moveForward(robot, world)).toContain({ x: 1, y: 0 });
  });

  it("does not move if the robot would go off the west edge", () => {
    const robot = { orientation: "W", x: 0, y: 1 };
    expect(moveForward(robot, world)).toContain({ x: 0, y: 1 });
  });

  it("marks the robot as lost if it goes off an edge", () => {
    const robot = { orientation: "W", x: 0, y: 1 };
    expect(moveForward(robot, world)).toContain({ lost: true });
  });
});
