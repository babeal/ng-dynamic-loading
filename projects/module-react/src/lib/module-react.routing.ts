import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { ModuleReactComponent } from "./module-react.component";

const routes: Route[] = [
    {
        path: "",
        component: ModuleReactComponent,
    },
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleReactRoutingModule {}
