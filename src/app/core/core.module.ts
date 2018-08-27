import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { RoutingModule } from "../routing.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "../auth/auth.guard";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        RoutingModule
    ],
    exports: [
        RoutingModule,
        HeaderComponent
    ],
    providers: [
        ShoppingListService,
        RecipeService, 
        AuthService
    ]
})

export class CoreModule{
}