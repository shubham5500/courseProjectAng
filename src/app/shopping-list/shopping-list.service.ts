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
    startEditing = new Subject<number>();
    
    getIngredients(){
       return _.union(this.ingredients.slice());
    }

    getIngredient(index){
        return this.ingredients[index];
    }

    onAddIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.getAllIngredient();
    }

    onGetIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.getAllIngredient();
    }

    upDatedIngredient(index, newIngredient){
        this.ingredients[index] = newIngredient;
        this.getAllIngredient();
    }

    deleteIngredient(index){
        this.ingredients.splice(index, 1);
        this.getAllIngredient();
    }

    getAllIngredient(){
        this.ingredientUpdated.next(this.ingredients.slice());
    }
}