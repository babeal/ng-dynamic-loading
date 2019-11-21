import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { ModuleAngularComponent } from "./module-angular.component";

const routes: Route[] = [
    {
        path: '',
        component: ModuleAngularComponent
    }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAngularRoutingModule { }
