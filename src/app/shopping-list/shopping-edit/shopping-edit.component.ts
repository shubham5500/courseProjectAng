import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  
  @ViewChild('ingredientNameRef') ingredientName: ElementRef;
  @ViewChild('ingredientAmountRef') ingredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(){
    if(this.ingredientName.nativeElement.value && this.ingredientAmount.nativeElement.value){
      let ingredientName =  this.ingredientName.nativeElement.value;
      let ingredientAmount = this.ingredientAmount.nativeElement.value;
      let newIngredient = new Ingredient(ingredientName, ingredientAmount)
      this.shoppingListService.onAddIngredients(newIngredient);
    }
  }

}
