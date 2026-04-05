# LeitnerCards

Projet de cartes d'apprentissage base sur le systeme de Leitner.

## Premier push

Ce premier push pose le socle du projet :
- conservation des modules `auth` et `users` du reste de l'equipe
- creation du contexte `cards`
- remplacement des templates Angular et Nest par une base plus propre

## Architecture visee

- `backend/src/cards` : futur contexte metier des fiches
- `backend/src/authentication` et `backend/src/users` : parties conservees pour le reste de l'equipe
- `frontend/src/app` : point d'entree de l'interface avant les ecrans de fiches

Ce push se concentre volontairement sur les fiches. Les parties auth et users restent presentes mais ne sont pas modifiees ici.

## Commandes utiles

### Backend

```bash
cd backend
npm install
npm run start:dev
npm run test
npm run test:e2e
npm run test:cov
```

### Frontend

```bash
cd frontend
npm install
npm start
npm test
```
