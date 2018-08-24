import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  index;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (params: Params)=>{
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = ''; 
    let recipeIngredients = new FormArray([]);
     
    if(this.editMode){
      const recipe = this.recipeService.getSingleRecipe(this.index);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredient']){
        for (let ingredient of recipe.ingredient) {
          console.log(ingredient);
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, 
                                                            Validators.pattern(/[1-9]+[0-9]*$/)])
            })
          )
        }
      } 
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredient': recipeIngredients
    })
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, 
          Validators.pattern(/[1-9]+[0-9]*$/)])
      })
    )
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
      this.backToRecipeFront();
    }else{
      this.recipeService.addNewRecipe(this.recipeForm.value);
      this.backToRecipeFront();
    }
  }

  backToRecipeFront(){
    this.router.navigate(['../'], {
      relativeTo: this.activateRoute
    })
  }

  onDeleteIngredient(index){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

}
