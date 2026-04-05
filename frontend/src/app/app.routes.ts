import { Routes } from '@angular/router';
import { CardsPageComponent } from './features/cards/cards-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cards',
  },
  {
    path: 'cards',
    component: CardsPageComponent,
  },
];
