import { ComponentPortal, DomPortalOutlet } from "@angular/cdk/portal";
import {
    ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injector, NgModule,
    ViewContainerRef
} from "@angular/core";

import { ModuleAngularComponent } from "./module-angular.component";
import { ModuleAngularRoutingModule } from "./module-angular.routing";

@NgModule({
    declarations: [ModuleAngularComponent],
    // imports: [ModuleAngularRoutingModule],
    // exports: [ModuleAngularComponent],
    // entryComponents: [ModuleAngularComponent]
})
export class ModuleAngularModule {
    constructor(
        private resolver: ComponentFactoryResolver,
        private app: ApplicationRef,
        private injector: Injector
    ) {}

    // First method:
    // return the component factory from the module and the client is responsible for instantiating the component
    public resolveComponentFactory(): ComponentFactory<ModuleAngularComponent> {
        return this.resolver.resolveComponentFactory(ModuleAngularComponent);
    }

    // Second method:
    // use the cdk and have the component instantiate and mount itself to the view container ref
    public render(
        viewContainerRef: ViewContainerRef
    ): ComponentRef<ModuleAngularComponent> {
        const host = new DomPortalOutlet(
            viewContainerRef.element.nativeElement,
            this.resolver,
            this.app,
            this.injector
        );

        const portal = new ComponentPortal(
            ModuleAngularComponent,
            viewContainerRef,
            this.injector,
            this.resolver
        );

        const componentRef = portal.attach(host);
        componentRef.changeDetectorRef.markForCheck();
        return componentRef;
    }
}
