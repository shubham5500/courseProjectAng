import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipeRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/auth.guard";



@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipesEditComponent,
     // DropdownDirective :: We must not decalre duplicate decalaration i.e (DropdownDirective) in more than one module //
    ],
    imports: [
        ReactiveFormsModule,    
        RecipeRoutingModule,
        SharedModule
    ],
    providers: [AuthGuard]
})

export class RecipesModule{

}