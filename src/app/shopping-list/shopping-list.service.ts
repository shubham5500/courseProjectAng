import { EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs/Subject';

export class ShoppingListService{
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    ingredientUpdated = new Subject<Ingredient[]>();
    
    getIngredients(){
       return _.union(this.ingredients.slice());
    }

    onAddIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientUpdated.next(this.ingredients.slice());
    }

    onGetIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientUpdated.next(this.ingredients.slice());
    }
}