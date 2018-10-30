import {
    Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges,
    Renderer2, ViewChild, HostBinding, Optional, Host, SkipSelf, Output, EventEmitter,
} from '@angular/core';
import {
    ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR,
} from '@angular/forms';
import * as _moment from 'moment-timezone';

const moment = _moment;

@Component({
    selector: 'kf-input',
    templateUrl: './kf-input.component.html',
    styleUrls: ['./kf-input.component.less'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => KfInputComponent),
        multi: true,
    }],
})
export class KfInputComponent implements OnInit, OnChanges, ControlValueAccessor {
    private _control: any;
    private _errors: any;
    private _value: any = null;
    control: any;
    public showCalendar = false;
    public displayDate = '';

    @HostBinding('class.kf-input-size-lg') get islg(): boolean {
        return this.size === 'lg';
    }
    @ViewChild('input') input: ElementRef;
    @ViewChild('textarea') textarea: any; // not element ref because of kf-text HostBinding
    @Input() formControlName: string = null;
    @Input() disabled = false;
    @Input() label: string = null;
    @Input() placeholder: string = null;
    @Input() resize = 'none' || 'both' || 'horizontal' || 'vertical' || 'initial' || 'inherit';
    @Input() size = 'md';
    @Input() type = 'text';
    @Input() maxlength: string;
    @Input() public locale = 'en';
    @Input() displayError = true;
    @Input() selectedDate: _moment.Moment = moment();
    @Input() noBorder = false;
    @Input() markTouched = false;
    @Input() rows = 2;
    @Input() grow = false;

    errorKeys: string[];

    @Input() set value(value: any) {
        if (this._value !== value) {
            this._value = value;
            this.valueChange.emit(this._value);
            this._onChange(value);
            if (this._control) {
                this.errors = this._control.errors;
            }
        }
    }

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    get value() {
        return this._value;
    }

    get errors(): any {
        return this._errors;
    }
    set errors(value: any) {
        this._errors = value;
        if (value) {
            this.errorKeys = Object.keys(value);
        }
    }
    touched = false;
    private _onChange = (_: any) => { };
    private _onTouched = () => { };
    @Input() private canSelectDate: (date: _moment.Moment) => boolean = () => true;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        @Optional() @Host() @SkipSelf()
        private _container: ControlContainer,
    ) { }

    ngOnInit() {
        if (this._container && this.formControlName) {
            this._control = this._container.control.get(this.formControlName);
        }
    }

    ngOnChanges(changes: SimpleChanges) {}

    writeValue(value: any): void {
        this.value = value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
    }
    registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        this.disabled = isDisabled;
    }

    public onBlur(): void {
        this._onTouched();
        this.touched = true;
        this.value = this.value.trim();
    }

    public onFocus(): void {
        this.showCalendar = (this.type === 'date');
    }

    public clearDate(): void {
        this.showCalendar = false;
    }

    public applyDate(date: _moment.Moment): void {
        this.value = date;
        this.showCalendar = false;
        this.displayDate = date.format('LL');
    }

    public getStyle(): string {
        let style = '';
        if (this.noBorder) style += 'no-border ';
        if (this.markTouched) style += 'error ';
        return style;
    }

    /**
    * This function enables text area to dynamically grow with input text
    *
    * @param grow: dictates whether the text area should grow or not
    * @TODO: Implement functionality
    */
    public autoGrowTextArea(grow: boolean): void {
        const elem = this.textarea.elementRef.nativeElement;
        if (grow && elem.scrollHeight > elem.clientHeight) {
            this.rows = this.rows * 1 + 1;
        }
    }
}
