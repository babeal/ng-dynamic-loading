declare const SystemJS

import * as TsLib from "tslib";

import * as AngularCdkPortal from "@angular/cdk/portal";
import * as AngularCommon from "@angular/common";
import * as AngularCore from "@angular/core";
import * as AngularRouter from "@angular/router";

// not sure if this is needed.
SystemJS.set("tslib", SystemJS.newModule(TsLib));

SystemJS.set("@angular/core", SystemJS.newModule(AngularCore));
SystemJS.set("@angular/common", SystemJS.newModule(AngularCommon));
SystemJS.set("@angular/router", SystemJS.newModule(AngularRouter));

// the portal doesn't import anything else from the CDK but if it did those dependencies
// would need to be enumerated here.
SystemJS.set("@angular/cdk/portal", SystemJS.newModule(AngularCdkPortal));
