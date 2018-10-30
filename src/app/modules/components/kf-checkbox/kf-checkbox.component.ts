import { Component, Input, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'kf-checkbox',
    templateUrl: './kf-checkbox.component.html',
    styleUrls: ['./kf-checkbox.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: KfCheckboxComponent,
            multi: true,
        },
    ],
})
export class KfCheckboxComponent implements ControlValueAccessor {
    public active = false;
    private onChange: (value: boolean) => void = _.noop;

    @Input() label: string = null;
    @Input() disabled = false;
    @HostListener('click') public clicked(): void {
        if (!this.disabled) {
            this.active = !this.active;
            this.onChange(this.active);
        }
    }

    public writeValue(value: boolean): void {
        this.active = value;
    }

    public registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(): void { }
}
