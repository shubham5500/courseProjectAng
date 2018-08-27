//MODULES
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTS
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRoutes: Routes = [
    {
        path: '',
        component: ShoppingListComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})

export class ShoppingListRoutingModule{

}