import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()

export class RecipeService{

    recipes: Recipe[] = [
        new Recipe( 'Schnitzel',
                    'Super tasty Schnitzel', 
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/220px-Wiener-Schnitzel02.jpg',
                    [new Ingredient('Meat', 2),new Ingredient('French Fries', 20)]
                ),
        new Recipe('Hamburger', 
                   'A king size Hamburger', 
                   'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/250px-Hamburger_%28black_bg%29.jpg',
                    [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
    ];
    
    // recipesList = new EventEmitter<Recipe[]>();
    
    constructor(public slService: ShoppingListService){
        
    }
    
    ngOnInit(): void {
        // this.recipesList.emit(this.recipes.slice());
    }

    getRecipe(){
        return this.recipes.slice();
    }

    sendIngredient(ingredient){
        this.slService.onGetIngredients(ingredient);
    }

    deleteRecipeItem(recipe: Recipe){
        this.recipes.pop();
        // this.recipesList.emit(this.recipes.slice());
    }

    getSingleRecipe(id){
        return this.recipes[id];
    }

}