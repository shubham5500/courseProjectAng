import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  
  constructor(private recipeService: RecipeService){

  }

  saveRecipes(){
    this.recipeService.saveRecipes().subscribe(
      (success)=>{
        console.log(success);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  getRecipes(){
    this.recipeService.getRecipes();
  }
}
