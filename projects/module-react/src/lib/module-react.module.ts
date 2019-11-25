import { ComponentPortal, DomPortalOutlet } from "@angular/cdk/portal";
import {
    ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injector, NgModule,
    ViewContainerRef
} from "@angular/core";

import { ModuleReactComponent } from "./module-react.component";
import { ModuleReactRoutingModule } from "./module-react.routing";

@NgModule({
    declarations: [ModuleReactComponent],
    imports: [ModuleReactRoutingModule],
})
export class ModuleReactModule {
    constructor(
        private resolver: ComponentFactoryResolver,
        private app: ApplicationRef,
        private injector: Injector
    ) {}

    // First method:
    // return the component factory from the module and the client is responsible for instantiating the component
    public resolveComponentFactory(): ComponentFactory<ModuleReactComponent> {
        return this.resolver.resolveComponentFactory(ModuleReactComponent);
    }

    // Second method:
    // use the cdk and have the component instantiate and mount itself to the view container ref
    public render(
        viewContainerRef: ViewContainerRef
    ): ComponentRef<ModuleReactComponent> {
        const host = new DomPortalOutlet(
            viewContainerRef.element.nativeElement,
            this.resolver,
            this.app,
            this.injector
        );

        const portal = new ComponentPortal(
            ModuleReactComponent,
            viewContainerRef,
            this.injector,
            this.resolver
        );

        const componentRef = portal.attach(host);
        componentRef.changeDetectorRef.markForCheck();
        return componentRef;
    }
}
