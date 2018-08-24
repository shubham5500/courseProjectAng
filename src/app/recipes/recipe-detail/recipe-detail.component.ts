import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeInfo: Recipe;
  id;
  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.id = params["id"];
        this.recipeInfo = this.recipeService.getSingleRecipe(this.id);
      }
    )
  }
  
  sendToShoppingList(){
    this.recipeService.sendIngredient(this.recipeInfo.ingredient);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipeItem(this.id);
    // this.router.navigate([`${this.id != '0' ? `../${this.id - 1}` : '../'}`], {
    //   relativeTo: this.activatedRoute
    // })
    this.router.navigate([`/recipes'}`], {
      relativeTo: this.activatedRoute
    })
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute
    })
  }
}
