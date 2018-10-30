import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './modules/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KfDropdownService } from './modules/shared/services/kf-dropdown.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  providers: [
    KfDropdownService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
