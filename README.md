# martian-robots

An implementation of Martian Robots using functional JavaScript.

## How to run

1. You'll need to install Node version 13 or greater.
2. At a shell prompt, pipe your input data into the Node command, like this:

```bash
node src/index.js < test/sampleInput.txt
```

You should then see the program results printed on screen.

## Sample test data

Sample input:

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

Which will return:

```
1 1 E
3 3 N LOST
2 3 S
```

## How to add a new instruction

To add a new instruction, you'll need to do the following.

1. In `src/instructions.js` (or in another file if you wish), define a function that takes two arguments: the `robot` state (e.g. `{ x: 3, y: 3, orientation: "WS" }`) and the `world` state (e.g. `{ maxX: 5, maxY: 5 }`). This function should return the new transformed robot state.

2. Add the instruction to the `instructionLookup` at the bottom of the same file. You'll need to give the instruction a single character keycode which is the used in the program input.

You can use the existing commands `moveForward`, `turnRight`, and `turnLeft` as references for how to implement a command.

## Running the automated tests

This package uses the Vitest test runner. To run the tests you can use the following commands:

```bash
npm install
npm test
```

## Description of code

There are four modules:

| Module | Description |
| ------ | ----------- |
| index.js | Reads stdin and invokes the application. This code has no automated tests.|
| io.js | Parsing input and formatting output. |
| processor.js | Runs each instruction on each robot, and passes any collected scents between robots. |
| instructions.js | Houses the individudal instructions that can affect the robot state. |

## Todo

Here's what I'd do if I had more time.

* The `io` module was a bit rushed - I'd probably split out some more tests, move in some of the code from `src/index.js` for reading `stdin` and also possibly rename the module itself.
* The `scents` array with functions `hasScents` and `addScent` code could be extended to use a more performant data structure, and possibly live in its own module
* Instructions don't get passed scents. It might make sense to move scents into the `world` context object, so that they can make use of that data.
