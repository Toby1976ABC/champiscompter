# ChampisCompter — mise en ligne et installation

Application web installable (PWA) : elle s'ouvre dans Safari (iPhone) ou Chrome (Android),
s'installe sur l'écran d'accueil comme une vraie application et fonctionne **sans réseau**
une fois ouverte une première fois. Aucune donnée n'est envoyée : tout reste sur le téléphone
jusqu'à l'export CSV / JSON.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | l'application (moteur de comptage inchangé, écrans mobiles des maquettes) |
| `manifest.webmanifest` | nom, icône, couleurs, ouverture plein écran |
| `sw.js` | service worker : garde l'application en mémoire pour le hors-ligne |
| `icons/` | logo Cabane & Cie et icônes d'écran d'accueil (iOS, Android) |

## 1. Mettre en ligne (une seule fois, ~5 minutes, gratuit)

L'appareil photo, le hors-ligne et l'installation exigent une adresse **https://**.
Au choix :

**Netlify Drop (le plus simple, sans compte technique)**
1. Sur un PC, ouvrir https://app.netlify.com/drop
2. Glisser-déposer **le dossier** `champiscompter` (celui qui contient `index.html`).
3. Netlify donne une adresse du type `https://xxxx.netlify.app` — créer un compte gratuit
   pour la garder et la renommer (ex. `champiscompter-cabane.netlify.app`).

**GitHub Pages** : créer un dépôt, y déposer le contenu du dossier,
Settings → Pages → Branche `main` / racine. Adresse : `https://<compte>.github.io/<depot>/`.

**Site de l'entreprise** : copier le dossier tel quel dans un sous-dossier servi en https
(ex. `https://cabaneetcie.fr/champiscompter/`).

## 2. Installer sur chaque téléphone

**iPhone (Safari)** : ouvrir l'adresse → bouton Partager (carré avec flèche)
→ « Sur l'écran d'accueil » → Ajouter.

**Android (Chrome)** : ouvrir l'adresse → menu ⋮ → « Installer l'application »
(ou le bouton « Installer ChampisCompter » dans l'onglet Réglages).

Ouvrir l'application une fois avec du réseau ; ensuite elle fonctionne en salle sans connexion.
L'onglet Réglages indique si l'application est bien installée.

## 3. Publier une nouvelle version

1. Remplacer `index.html` (et les autres fichiers modifiés).
2. Dans `sw.js`, changer la ligne `VERSION` (ex. `champiscompter-2.1.1`).
3. Redéposer le dossier. À la prochaine ouverture, un bandeau « Mettre à jour » apparaît.

Les relevés enregistrés ne sont pas touchés par une mise à jour, **tant que l'adresse ne change pas**.

## Bon à savoir

- Les relevés sont liés à l'adresse et au navigateur : changer d'adresse ou effacer les données
  du site les fait perdre → **export JSON en fin de semaine** (onglet Historique).
- Sur iPhone, installer sur l'écran d'accueil évite que Safari efface les données d'un site
  peu ouvert.
- `champiscompter-fichier-unique.html` (à côté du dossier) est une version d'un seul fichier,
  pour un PC ou un essai rapide : elle fonctionne ouverte directement, mais ne s'installe pas
  et ne se met pas à jour toute seule.
