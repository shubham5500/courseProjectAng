import { Recipe } from "./recipe.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AuthService } from "../auth/auth.service";



@Injectable()

export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();

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
    
    constructor(public slService: ShoppingListService, 
                private http: Http,
                private authService: AuthService){
        
    }
    
    ngOnInit(): void {
    }

    setRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        console.log(this.recipes)
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipe(){
        return this.recipes.slice();
    }

    sendIngredient(ingredient){
        this.slService.onGetIngredients(ingredient);
    }

    deleteRecipeItem(index){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

    getSingleRecipe(id){
        return this.recipes[id];
    }

    addNewRecipe(recipe: Recipe){
        console.log('SERVICE SE', recipe)
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        console.log('SERVICE SE', recipe)
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    saveRecipes(){
        let token = this.authService.getToken();
        console.log('token', token);
        return this.http.put(`https://testingapp-3fb7a.firebaseio.com/recipes.json?auth=${token}`, this.getRecipe()).map(
            (response)=>{
                return response.json();
            }
        );
    }

    getRecipes(){
        let token = this.authService.getToken();
        this.http.get(`https://testingapp-3fb7a.firebaseio.com/recipes.json?auth=${token}`)
        .map(
            (response: Response)=>{
                const recipes: Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredient']){
                        recipe['ingredient'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[])=>{
                this.setRecipe(recipes);
            }
        )
    }

}