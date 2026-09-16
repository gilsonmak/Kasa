# Kasa — application de location immobilière

Application React d'une plateforme de location entre particuliers, développée
à partir d'une maquette Figma et d'un cahier des charges (projet de formation
OpenClassrooms), puis reprise après une revue de code externe portant sur
l'accessibilité et les tests.

React 18 · React Router 6 · Sass · Testing Library

**Démo :** https://gilsonmak.github.io/Kasa

---

## Fonctionnalités

- Liste des logements sur la page d'accueil, chaque carte menant à sa fiche.
- Fiche logement : carrousel de photos, note en étoiles, tags, sections
  dépliables pour la description et les équipements.
- Page « À propos » construite sur les mêmes sections dépliables.
- Redirection vers une page 404 lorsqu'un identifiant de logement n'existe pas.
- Affichage adapté du mobile au poste de travail.

## Démarrage

```bash
npm install
npm start      # http://localhost:3000
npm test       # tests des composants
npm run build
```

## Structure

```
src/
├── Components/     Card, Carrousel, Collapse, Ratings, Tag, Header, Footer, Banner
├── Pages/          HomePage, HousingPage, AboutPage, ErrorPage
├── Data/           logements.json, about.json
└── Assets/
```

Chaque composant interactif est accompagné de ses tests dans un dossier
`__tests__` voisin.

## Ce qui a été corrigé après revue

Une revue externe a relevé trois défauts. Ils sont documentés ici parce qu'ils
sont instructifs.

**1. Le `useEffect` du carrousel n'avait pas de tableau de dépendances.**

Le nettoyage évitait l'accumulation d'écouteurs clavier, donc le bug ne se
voyait pas. Mais l'écouteur était retiré puis réinstallé à chaque rendu, et
surtout on ne pouvait plus dire quand l'effet se déclenchait. La correction
combine `useCallback` pour stabiliser la fonction et un tableau de
dépendances explicite.

**2. Les éléments interactifs n'étaient pas des éléments interactifs.**

Les flèches du carrousel étaient des `<img onClick>`, le titre dépliable un
`<div onClick>`. Les trois conséquences : pas de focus au clavier, aucune
réaction aux touches Entrée et Espace, et aucune annonce du rôle ni de l'état
par un lecteur d'écran. Tout cela est désormais porté par de vrais `<button>`,
avec `aria-expanded`, `aria-controls` et un anneau de focus visible. Le style
natif du bouton est neutralisé en CSS : l'élément est choisi pour son
comportement, pas pour son apparence.

Le composant de notation affichait par ailleurs cinq images portant chacune
`alt="rating"` — un lecteur d'écran annonçait « rating » cinq fois sans jamais
donner la note. Les étoiles sont maintenant décoratives et l'information est
portée une seule fois : « Note : 3 sur 5 ».

**3. Le seul test présent était celui généré par Create React App.**

Il cherchait le texte « learn react », absent de l'application depuis
longtemps : un test sans valeur, et probablement cassé. Il a été remplacé par
20 tests portant sur le comportement réel, dont les cas limites explicitement
signalés comme non couverts :

- carrousel à une seule image — pas de flèches, pas de compteur ;
- liste d'images vide — le composant ne rend rien plutôt que de planter ;
- bouclage dans les deux sens ;
- navigation au clavier, et vérification que les flèches reçoivent bien le
  focus — ce qu'un `<img onClick>` n'aurait jamais permis ;
- ouverture du panneau dépliable à la touche Entrée ;
- notes hors plage, bornées au lieu d'afficher n'importe quoi.

## Limites connues

- Les données viennent d'un fichier JSON local, sans API ni backend.
- Pas de TypeScript : les props sont validées par `prop-types`, ce qui ne
  protège qu'à l'exécution et en développement.
- Le panneau dépliable utilise `aria-hidden` plutôt que `hidden`, pour
  conserver l'animation de hauteur. Le contenu n'étant que du texte, il n'y a
  pas d'élément focalisable à neutraliser ; avec des liens à l'intérieur, il
  faudrait revoir ce compromis.
- Pas de test de bout en bout sur la navigation entre les pages.

---

Auteur : Gilson Makanounou — [github.com/gilsonmak](https://github.com/gilsonmak)
