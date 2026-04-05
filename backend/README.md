## Backend

API NestJS de LeitnerCards.

Ce premier push se concentre sur `cards` pour la gestion des fiches.

Les modules `authentication` et `users` sont conserves car ils appartiennent a une autre partie du projet.

## Installation

```bash
npm install
```

## Demarrage

```bash
npm run start
npm run start:dev
npm run start:prod
```

## Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Etat actuel

- endpoint `GET /` pour decrire l'etat de l'application
- `CardsModule` integre et expose des routes de gestion de fiches
- modules `authentication` et `users` laisses intacts

## Nouveautes cards

- support des tags de carte
- recherche par tag : `GET /cards/tags?tags=tag1,tag2`
- recuperation des cartes dues : `GET /cards/due?ownerId=<id>`
- revue de carte : `POST /cards/:id/review`
- use cases `ListCardsByTagsUseCase`, `ListDueCardsByOwnerUseCase`, `ReviewCardUseCase`
