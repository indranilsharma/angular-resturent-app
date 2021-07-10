import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipe.component';
import { AuthGurd } from '../auth/auth-gurd';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

// if LAZY loaidng not implemented then path:'recipes' should be
const routes: Routes = [
  {
    //  normal senariao
    // path: 'recipes',
    //  LAZY loading path should be empted
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGurd],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
         path: ':id',
         component: RecipeDetailComponent
       , resolve: [RecipeResolverService]
    },
      {
         path: ':id/edit',
         component: RecipeEditComponent ,
         resolve: [RecipeResolverService]
      }
    ]
  },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class RecipesRoutingModule {

}
