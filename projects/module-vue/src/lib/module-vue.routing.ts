import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { ModuleVueComponent } from "./module-vue.component";

const routes: Route[] = [
    {
        path: "",
        component: ModuleVueComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleVueRoutingModule {}
