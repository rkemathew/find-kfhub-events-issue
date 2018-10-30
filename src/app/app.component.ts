import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    someBindingVariable = ''

    public customizeForm: FormGroup = null;
    public previewForm: FormGroup = null;
    public code = '';

    constructor(private formBuilder: FormBuilder) {
        const customizeForm = this.formBuilder.group({
            disabled: false,
            label: '',
            placeholder: '',
            type: '',
        });
        this.customizeForm = customizeForm;
        this.previewForm = formBuilder.group({
            input: '',
        });
    }
}
