import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) throw new Error("usage: node scripts/prepare-data.mjs <dir>");

function readCsv(name) {
  const [header, ...lines] = readFileSync(join(dir, name), "utf8").trim().split(/\r?\n/);
  const cols = header.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(cols.map((c, i) => {
      const v = values[i];
      if (v === "" || v === "NA" || v === "NaN") return [c, null];
      return [c, isNaN(+v) ? v : +v];
    }));
  });
}

function write(name, data) {
  writeFileSync(join("src/data", name), JSON.stringify(data));
  console.log(`${name} : ${data.length} lignes`);
}

const penguins = readCsv("penguins.csv");
write("penguins.json", penguins);
write(
  "penguins-light.json",
  penguins
    .filter((d) => d.culmen_length_mm != null && d.culmen_depth_mm != null && d.sex != null)
    .map(({ species, island, culmen_length_mm, culmen_depth_mm, sex }) =>
      ({ species, island, culmen_length_mm, culmen_depth_mm, sex }))
);
write("aapl.json", readCsv("aapl.csv").map(({ Date, Close }) => ({ Date, Close })));
write("alphabet.json", readCsv("alphabet.csv"));
