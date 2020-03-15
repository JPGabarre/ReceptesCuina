import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReceptasComponent } from './receptas/receptas.component';
import { ReceptasFilterPipe } from './receptas/receptas-filtre.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReceptasComponent,
    ReceptasFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
