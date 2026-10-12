# TP R3.12 – Astro & Observable Plot

**Nom :** Geiss
**Prénom :** Solène

**Site publié :** https://A-COMPLETER.netlify.app
**Dépôt GitHub :** https://github.com/A-COMPLETER/TP1_R312_GS

## Contenu

- `src/components/PlotFigure.astro` : composant qui rend un graphique [Observable Plot](https://observablehq.com/plot/) au build, côté serveur, grâce à JSDOM (aucun JavaScript côté client).
- `src/pages/penguins.astro` : l'exemple des penguins de la documentation de Plot, plus deux variantes (barres empilées, facettes par sexe).
- `src/pages/exemples.astro` : d'autres exemples de la galerie de Plot (courbe de l'action Apple, diagramme en barres et graphique de Cleveland des fréquences de lettres).
- `src/data/` : données en JSON. `penguins.json` est le fichier complet, `penguins-light.json` la version filtrée (bonus) : uniquement les colonnes utiles et sans valeurs manquantes (49 Ko → 33 Ko).
- `scripts/prepare-data.mjs` : script qui convertit les CSV d'exemple de Plot en JSON et filtre les colonnes.

## Accessibilité

Chaque graphique utilise les options `title`, `subtitle` et `caption` de Plot, qui génèrent un `<figure>` avec titre et `<figcaption>`, ainsi qu'un `ariaLabel` sur le SVG. Vérification avec Chrome DevTools : panneau Lighthouse et vue « Arborescence de l'accessibilité ».

## Commandes

| Commande          | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installe les dépendances                    |
| `npm run dev`     | Lance le serveur de dev sur `localhost:4321` |
| `npm run build`   | Construit le site dans `./dist/`            |
| `npm run preview` | Prévisualise le build                       |

Déploiement sur Netlify avec l'adaptateur `@astrojs/netlify`.
