import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// if LAZY loading not impplemented the path should be
//ONLY {path: '', redirectTo: '/recipes', pathMatch: 'full'},

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // for LAZY Loading only
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
];
@NgModule({
imports: [ RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
 })
export class AppRoutingModule{}
