import { NgModule } from "@angular/core";

import { ModuleAngularComponent } from "./module-angular.component";
import { ModuleAngularRoutingModule } from "./module-angular.routing";

@NgModule({
  declarations: [ModuleAngularComponent],
  imports: [ModuleAngularRoutingModule],
  exports: [ModuleAngularComponent],
  entryComponents: [ModuleAngularComponent]
})
export class ModuleAngularModule { }
