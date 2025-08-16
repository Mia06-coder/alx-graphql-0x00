// Node 18+ has global fetch.
// This script posts each .graphql query in character/ to the endpoint
// and writes the response to the matching *-output.json file.

import { readFile, writeFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENDPOINT = "https://rickandmortyapi.com/graphql";
const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..");

const files = (await readdir(dir)).filter((f) => f.endsWith(".graphql")).sort(); // ensures 1..4 order

for (const file of files) {
  const query = await readFile(join(dir, file), "utf8");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();

  const out = file.replace(".graphql", "-output.json");
  await writeFile(join(dir, out), JSON.stringify(json, null, 2), "utf8");
  console.log(`Wrote ${out}`);
}
