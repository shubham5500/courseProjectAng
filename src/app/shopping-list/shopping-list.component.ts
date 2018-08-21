import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientUpdated.subscribe(
      (ingredients)=>{
        console.log('_.union(ingredients)', _.union(ingredients))
        this.ingredients = _.union(ingredients);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
