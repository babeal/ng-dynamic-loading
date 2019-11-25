import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

import {
    AfterViewInit, Compiler, Component, ComponentRef, ElementRef, Injector, Input, OnDestroy,
    ViewChild, ViewContainerRef, ɵcreateInjector as createInjector
} from "@angular/core";
import { Route, Router, RouterEvent } from "@angular/router";

import { IModule, ModulesService } from "./services/modules.service";

declare const SystemJS;

// had used ng-container before rc.3 but now ng-container throws an exception that the node can't be appended
// even though it actually is. so swapped to div
@Component({
    selector: "app-ivy",
    template: `
        <div #root></div>
    `,
    styles: [``],
})
export class IvyComponent implements AfterViewInit {
    @Input() zone: any;

    @ViewChild("root", { read: ViewContainerRef })
    root: ViewContainerRef;

    constructor(
        private modulesService: ModulesService,
        private injector: Injector
    ) {}

    ngAfterViewInit() {
        // this.modules$ = this.modulesService.modules$.subscribe(this.loadModules.bind(this));
        this.loadComponent();
    }

    // Loads the component using systemjs.  see the system.js file for the modules it knows how to resolve.
    //
    // not yet sure what to do when this component unloads and reloads.
    private loadComponent() {
        try {
            SystemJS.import(
                "assets/modules/module-angular/module-angular.js"
            ).then(ModuleAngular => {

                const injector = createInjector(
                    ModuleAngular.default,
                    this.injector
                );
                const module = injector.get(ModuleAngular.default);
                const componentRef = module.render(this.root);
                componentRef.instance.name = "MYNAME";
                componentRef.changeDetectorRef.markForCheck();

            });
        } catch (error) {
            console.error(
                "IvyComponent::loadComponent",
                "assets/modules/module-angular/module-angular.js",
                error
            );
        }
    }

    // this approach won't work yet since the module uses require for the angular modules and those can't be resolved;
    // what's interesting is that the url has to be extracted and passed to import as a variable or webpack will try to
    // load the file.
    // it outputs this exception when build and served
    //    WARNING in ./src/app/ivy.component.ts 35:12-23
    //    Critical dependency: the request of a dependency is an expression
    // private loadComponentUsingDynamicImports() {
    //     const url =
    //         "http://localhost:4200/assets/modules/module-angular/module-angular.js"
    //     import(url).then(ModuleAngular => {
    //         const injector = createInjector(
    //             ModuleAngular.default,
    //             this.injector
    //         );
    //         const carouselModule = injector.get(ModuleAngular.default);
    //         carouselModule.render(this.root);
    //     });
    // }

    // loadModules(modules: IModule[]) {
    //   for (const moduleDef of modules) {
    //     if (moduleDef.zone && moduleDef.zone == this.zone) {
    //       try {
    //         SystemJS.import(moduleDef.path).then((module) => {
    //           this.loadComponent(moduleDef, module)
    //         })
    //       }
    //       catch (error) {
    //         console.error('ZoneComponent::loadComponent', moduleDef, error)
    //       }
    //     }
    //   }
    // }

    // private loadComponent(moduleDef: IModule, module) {
    //   console.log('ZoneComponent::loadComponent', moduleDef, module)
    //   this.compiler.compileModuleAndAllComponentsAsync(module.default)
    //     .then((compiled) => {
    //       const moduleRef = compiled.ngModuleFactory.create(this.injector);
    //       const components = compiled.componentFactories
    //       const factory = compiled.componentFactories[components.length - 1];
    //       console.log('ZoneComponent::loadedComponent', moduleRef, components)
    //       if (factory) {
    //         const component: ComponentRef<any> = this.root.createComponent(factory);
    //         const instance = component.instance;
    //         component.onDestroy(() => {
    //           moduleRef.destroy()
    //         })
    //       }
    //     });
    // }

    // ngOnDestroy() {
    //   this.modules$.unsubscribe();
    // }
}
