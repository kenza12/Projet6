# JustStreamIt

**JustStreamIt** est une application web permettant de visualiser les films les mieux notés dans différentes catégories. Elle utilise une API locale pour récupérer des informations sur les films et les affiche dans un carrousel interactif.

## Fonctionnalités

- Affichage du film le mieux noté (Imdb) toutes catégories confondues.
- Carrousels pour parcourir les 7 films les mieux notés dans toutes catégories confondues.
- Carrousels pour parcourir les 7 films les mieux notés dans des catégories spécifiques (Action, Comédie, Drame).
- Modale pour afficher des détails supplémentaires sur chaque film, soit en cliquant sur l'image du film ou le bouton Play du Meilleur film.

## Installation et Démarrage

L'application requiert l'installation de l'API **OCMovies** localement pour fonctionner correctement. Suivez ces étapes pour l'installer :

1. Clonez le dépôt du site depuis GitHub :

 ```code
    git clone https://github.com/kenza12/Projet6.git
    cd Projet6
```

2. Clonez le dépôt de l'API depuis GitHub :

 ```code
    git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

Suivez les instructions du fichier `README.md` du dépôt [OCMovies API GitHub Repository](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) pour installer et démarrer le serveur de l'API.

Après avoir démarré le serveur de l'API, vous pouvez ouvrir `index.html` dans un navigateur web moderne.

## Technologie

- *HTML* pour la structure de la page.
- *SASS/CSS* pour le style.
- *JavaScript* pour la logique interactive et les requêtes API.
