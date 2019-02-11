import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageMapComponent } from './page-map/page-map.component';
import { GoMapComponent } from './go-map/go-map.component';

@NgModule({
  declarations: [
    AppComponent,
    PageMapComponent,
    GoMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
