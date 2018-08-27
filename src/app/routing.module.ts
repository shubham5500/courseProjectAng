import { Routes,RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "../../node_modules/@angular/core";
import { HomeComponent } from "./core/home/home.component";

const appRoute: Routes = [
    {
        path: '',
        // redirectTo: '/recipes',
        // pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'recipes',
        loadChildren: './recipes/recipes.module#RecipesModule' 
        //This above is lazy loading route, this module will be loaded whenever it is neccessary to be loaded and that is called lazy loading
    },
    {
        path: 'shopping-list',
        loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute, {
            preloadingStrategy: PreloadAllModules 
            // This above tells "preloadingStrategy: PreloadAllModules" the browser to preload all the lazy loaded routes while the user is browsing some other page it is for optimizing and boosting the performance of the app..
        }) 
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule{

}