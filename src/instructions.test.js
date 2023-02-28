import { describe, it, expect } from "vitest";
import { turnLeft } from "./instructions.js";

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

desc;
