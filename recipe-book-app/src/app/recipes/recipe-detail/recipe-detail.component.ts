import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // we not recive value , configure from outside
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
       this.id = +params['id'];
       this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingListService(this.recipe.ingredients);
  }
  onEditRecipe() {
   this.router.navigate(['edit'], {relativeTo: this.route});
  // more complext setup upone level '../'
  // this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route});
  }
  onDeleteReceipe() {
   this.recipeService.deleteRecipe(this.id);
   this.router.navigate(['/recipes']);
  }
}
