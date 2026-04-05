import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('LeitnerCards');
  protected readonly backendHighlights = [
    'Architecture preparee pour le contexte cards',
    "La partie auth et users reste separee pour ne pas empiéter sur l'autre membre du groupe",
    'Point de depart propre pour les use cases et les tests unitaires',
  ];
  protected readonly frontendHighlights = [
    "Page d'accueil minimale pour sortir du template Angular",
    'Base propre pour introduire les ecrans de gestion de fiches dans les prochains pushes',
  ];
}
