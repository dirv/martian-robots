import { describe, it, expect } from "vitest";
import { runWithInput } from "./io.js";

const sampleInput = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

const sampleOutput = `1 1 E
3 3 N LOST
2 3 S`;

describe("runWithInput", () => {
  it("runs provided sample input", () => {
    expect(runWithInput(sampleInput)).toEqual(sampleOutput);
  });
});
