import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Katla-Fish', 5),
    new Ingredient('Fruit', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(indext: number) {
  return this.ingredients[indext];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }

    // es6 feature spread operator
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredients(index: number, newIngedient: Ingredient) {
   this.ingredients[index] = newIngedient;
   this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
   this.ingredients.splice(index, 1);
   this.ingredientsChanged.next(this.ingredients.slice());
  }
}
