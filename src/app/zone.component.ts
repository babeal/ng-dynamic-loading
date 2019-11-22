import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

import {
    AfterViewInit, Compiler, Component, ComponentRef, ElementRef, Injector, Input, OnDestroy,
    ViewChild, ViewContainerRef
} from "@angular/core";
import { Route, Router, RouterEvent } from "@angular/router";

import { IModule, ModulesService } from "./services/modules.service";

declare const SystemJS;

@Component({
    selector: "app-zone",
    template: `
        <ng-container #root></ng-container>
    `,
    styles: [""],
})
export class ZoneComponent implements AfterViewInit, OnDestroy {
    @Input() zone: any;
    @ViewChild("root", { read: ViewContainerRef }) root: ViewContainerRef;
    private modules$: Subscription;

    constructor(
        private modulesService: ModulesService,
        private compiler: Compiler,
        private injector: Injector
    ) {}

    ngAfterViewInit() {
        this.modules$ = this.modulesService.modules$.subscribe(
            this.loadModules.bind(this)
        );
    }

    loadModules(modules: IModule[]) {
        for (const moduleDef of modules) {
            if (moduleDef.zone && moduleDef.zone === this.zone) {
                try {
                    SystemJS.import(moduleDef.path).then(module => {
                        this.loadComponent(moduleDef, module);
                    });
                } catch (error) {
                    console.error(
                        "ZoneComponent::loadComponent",
                        moduleDef,
                        error
                    );
                }
            }
        }
    }

    private loadComponent(moduleDef: IModule, module) {
        console.log("ZoneComponent::loadComponent", moduleDef, module);
        this.compiler
            .compileModuleAndAllComponentsAsync(module.default)
            .then(compiled => {
                const moduleRef = compiled.ngModuleFactory.create(this.injector);
                const components = compiled.componentFactories;
                const factory =
                    compiled.componentFactories[components.length - 1];
                console.log(
                    "ZoneComponent::loadedComponent",
                    moduleRef,
                    components
                );
                if (factory) {
                    const component: ComponentRef<any> = this.root.createComponent(
                        factory
                    );
                    const instance = component.instance;
                    component.onDestroy(() => {
                        moduleRef.destroy();
                    });
                }
            });
    }

    ngOnDestroy() {
        this.modules$.unsubscribe();
    }
}
