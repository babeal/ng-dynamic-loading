import { HttpClientModule } from "@angular/common/http";
import { Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { JitCompilerFactory } from "@angular/platform-browser-dynamic";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { IvyComponent } from "./ivy.component";
import { RouterService } from "./services/router.service";
import { ZoneComponent } from "./zone.component";

@NgModule({
  declarations: [
    AppComponent,
    ZoneComponent,
    IvyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([], { useHash: true })
  ],
  providers: [
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS]
    },
    {
      provide: Compiler,
      useFactory: createCompiler,
      deps: [CompilerFactory]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private routerService: RouterService) {
  }
}


export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}
