import { Routes } from '@angular/router';
import { CardsPageComponent } from './features/cards/cards-page.component';
import { LoginPageComponent } from './features/login/login-page.component';
import { authGuard } from './core/api/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cards',
  },
  {
    path: 'cards',
    component: CardsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },


];
