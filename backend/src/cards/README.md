# Cards bounded context

Ce contexte contiendra la gestion des fiches d'apprentissage.

Arborescence cible :
- `domain` : entites et regles metier
- `application` : cas d'usage
- `infrastructure` : repository memoire ou persistance
- `interfaces/http` : controleurs et DTO

Etat actuel :
- entite metier `Card`
- validations de creation
- categorie initiale du systeme de Leitner fixee a 1
- port `CardRepository` pour preparer la persistance
- use case `CreateCardUseCase`
- port `CardIdGenerator` pour externaliser la generation d'identifiant
- use case `GetCardByIdUseCase`
- use case `ListCardsByOwnerUseCase`
- use case `UpdateCardUseCase`
- use case `DeleteCardUseCase`
- repository en memoire `InMemoryCardRepository`
- generateur d'identifiant `InMemoryCardIdGenerator`
