# LeitnerCards

Application de révision basée sur le système de Leitner.

## Présentation

Ce projet se compose de deux parties :
- `backend/` : API NestJS pour la gestion des cartes, l'authentification et les utilisateurs.
- `frontend/` : application Angular qui consomme l'API et permet de créer, réviser et gérer des cartes.

## Fonctionnalités principales

- Authentification JWT avec utilisateurs en mémoire
- Création, mise à jour et suppression de cartes
- Consultation des cartes par propriétaire, tags ou date d'échéance
- Revue d'une carte avec validation de la réponse
- Interface Angular légère et responsive

## Utilisateurs de test

Le backend initialise des utilisateurs en dur avec les identifiants suivants :

- `test@mail.com` / `password`
- `john@mail.com` / `password`
- `shantal@mail.com` / `password`

## Installation et exécution

### Backend

```bash
cd backend
npm install
npm run start:dev
```

L'API tourne par défaut sur `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

L'application frontend tourne par défaut sur `http://localhost:4200`.

## Commandes de test

### Backend

```bash
cd backend
npm run test
npm run test:e2e
npm run test:cov
```

### Frontend

```bash
cd frontend
npm test
```

## Endpoints importants

- `POST /auth/login` : connexion utilisateur
- `POST /cards` : création d'une carte
- `GET /cards` : liste des cartes d'un propriétaire
- `GET /cards/due` : liste des cartes dues pour révision
- `PATCH /cards/:id` : mise à jour d'une carte
- `POST /cards/:id/review` : soumission d'une réponse de révision