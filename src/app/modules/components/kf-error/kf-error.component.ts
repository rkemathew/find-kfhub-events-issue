import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'kf-error',
    templateUrl: './kf-error.component.html',
    styleUrls: ['./kf-error.component.less'],
})
export class KfErrorComponent implements OnInit {
    private _errors: ValidationErrors = null;
    errorKeys: string[] = null;

    @Input() set errors(value: ValidationErrors) {
        this._errors = value;
        if (value) {
            this.errorKeys = Object.keys(value).filter((key: string) => value[key]);
        }
    }
    constructor() { }

    ngOnInit() {}
}
