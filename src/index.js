import { runWithInput } from "./io.js";

let data = "";

async function run() {
  for await (const chunk of process.stdin) data += chunk;
  console.log(runWithInput(data.trim()));
}

run();
