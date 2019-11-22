import React from "react";
import ReactDOM from "react-dom";

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { HelloWorld } from "./component";

@Component({
    selector: "lib-module-react",
    template: `
        <div #root></div>
    `,
    styles: [],
})
export class ModuleReactComponent implements OnInit {
    @ViewChild("root", { static: true }) root: ElementRef;

    constructor() {}

    ngOnInit() {
        ReactDOM.render(
            React.createElement(HelloWorld, {}, null),
            this.root.nativeElement
        );
    }
}
