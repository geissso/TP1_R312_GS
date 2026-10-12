// Convertit les CSV d'exemple de Plot en JSON et ne garde que les colonnes utiles
// (bonus : limite la taille des fichiers JSON embarqués dans le site).
// Usage : node scripts/prepare-data.mjs <dossier contenant penguins.csv, aapl.csv, alphabet.csv>
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) throw new Error("Préciser le dossier des CSV source");

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
// Fichier complet, tel que téléchargé
write("penguins.json", penguins);
// Version filtrée : uniquement les colonnes utilisées, sans valeurs manquantes
write(
  "penguins-light.json",
  penguins
    .filter((d) => d.culmen_length_mm != null && d.culmen_depth_mm != null && d.sex != null)
    .map(({ species, island, culmen_length_mm, culmen_depth_mm, sex }) =>
      ({ species, island, culmen_length_mm, culmen_depth_mm, sex }))
);
// Cours de l'action Apple : uniquement la date et la clôture
write("aapl.json", readCsv("aapl.csv").map(({ Date, Close }) => ({ Date, Close })));
write("alphabet.json", readCsv("alphabet.csv"));
