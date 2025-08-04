import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { title } from 'process';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/auth/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '',
    component: BlankComponent,
    title: 'Blank ',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../app/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
        canActivate: [authGuard],
        title: 'home',
      },
      {
        path: 'shope',
        loadComponent: () =>
          import('../app/pages/shope/shope.component').then(
            (c) => c.ShopeComponent
          ),
        title: 'shope',
      },

      {
        path: 'details/:id',
        loadComponent: () =>
          import('../app/pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../app/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'My Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('../app/pages/brandes/brandes.component').then(
            (c) => c.BrandesComponent
          ),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../app/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('../app/pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
        title: 'Wishlist',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('../app/pages/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'Checkout',
      },
    ],
  },

  {
    path: '',
    component: AuthComponent,
    canActivate: [loggedGuard],
    title: 'Auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('../app/layouts/auth-layout/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../app/layouts/auth-layout/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'NotFound!' },
];
