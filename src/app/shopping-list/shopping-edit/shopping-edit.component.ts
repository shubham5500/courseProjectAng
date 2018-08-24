import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  subscription: Subscription;
  ingredientIndex;
  editMode = false;
  editableIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription =  this.shoppingListService.startEditing.subscribe(
      (indexNumber: number)=>{
        this.editMode = true;
        this.ingredientIndex = indexNumber;
        this.editableIngredient = this.shoppingListService.getIngredient(indexNumber);
        this.shoppingListForm.setValue({
          itemName: this.editableIngredient.name,
          amount: this.editableIngredient.amount
        })
      }
    )
  }

  onSubmit(form: NgForm){
    let value = form.value;
    if(value.itemName && value.amount){
      let newIngredient = new Ingredient(value.itemName, value.amount);
      if(this.editMode){
        this.shoppingListService.upDatedIngredient(this.ingredientIndex ,newIngredient)
      }else{
        this.shoppingListService.onAddIngredients(newIngredient);
      }
      this.shoppingListForm.reset();
      this.editMode = false;
    }
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
