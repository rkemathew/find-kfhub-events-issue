import { NgModule } from '@angular/core';
import { KfInputComponent } from './kf-input/kf-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KfIconComponent } from './kf-icon/kf-icon.component';
import { KfErrorComponent } from './kf-error/kf-error.component';
import { KfCalendarComponent } from './kf-calendar/kf-calendar.component';
import { KfCardComponent } from './kf-card/kf-card.component';
import { KfDropdownItemComponent } from './kf-dropdown-item/kf-dropdown-item.component';
import { KfCheckboxComponent } from './kf-checkbox/kf-checkbox.component';
import { KfTextComponent } from './kf-text/kf-text.component';
import { KfDropdownComponent } from './kf-dropdown/kf-dropdown.component';


@NgModule({
  declarations: [
    KfIconComponent,
    KfInputComponent,
    KfErrorComponent,
    KfCalendarComponent,
    KfCardComponent,
    KfDropdownComponent,
    KfDropdownItemComponent,
    KfCheckboxComponent,
    KfTextComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    KfIconComponent,
    KfInputComponent,
    KfErrorComponent,
    KfCalendarComponent,
    KfCardComponent,
    KfDropdownComponent,
    KfDropdownItemComponent,
    KfCheckboxComponent,
    KfTextComponent,
  ],
  providers: [],
})
export class ComponentsModule { }
