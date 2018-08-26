import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  subscription: Subscription;


  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
    this.subscription = this.recipeService.recipeChanged.subscribe((recipe:Recipe[])=>{
      console.log('RECIPE LIST SE', recipe);
      this.recipes = recipe;
    })
  }

  onNewRecipe(){
    this.router.navigate(['new'], {
      relativeTo: this.activatedRoute
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
