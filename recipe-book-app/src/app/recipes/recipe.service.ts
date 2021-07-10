import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

 recipesChanged = new Subject<Recipe[]>();
 private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chichen Kosha',
  //     'Speicey chiken 4 pics',
  //     'https://i.ndtvimg.com/i/2016-07/chicken-korma_625x350_71467713811.jpg',
  //     [
  //       new Ingredient('Chiken', 1),
  //       new Ingredient('Ginger', 4)
  //     ]
  //     ),
  //   new Recipe(
  //     'Dal makhanni',
  //     'Speicey one bowl',
  //     'https://i.ndtvimg.com/i/2016-07/chicken-korma_625x350_71467713811.jpg',
  //      [
  //        new Ingredient('Dal', 1),
  //        new Ingredient('Ginger', 4)
  //     ]
  //     ),
  //   new Recipe(
  //     'Panneer Dopiyza',
  //     'Panneer gravy',
  //     'https://i.ndtvimg.com/i/2016-07/chicken-korma_625x350_71467713811.jpg',
  //     [
  //     new Ingredient('Paneer', 1),
  //     new Ingredient('Ginger', 4)
  //    ]
  //    )
  // ];

  constructor(private slService: ShoppingListService) {}

  // override exsisting one
  setRecipes(recipes: Recipe[]) {
   this.recipes = recipes;
   this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
     return this.recipes.slice();
  }
  // get the signle recipe
  getRecipe(index: number) {
   return this.recipes[index];
  }
  addIngredientsToShoppingListService(ingredients: Ingredient[]) {
     this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
   this.recipes.push(recipe);
   this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe ) {
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
   this.recipes.splice(index, 1);
   this.recipesChanged.next(this.recipes.slice()) ;
  }
}
