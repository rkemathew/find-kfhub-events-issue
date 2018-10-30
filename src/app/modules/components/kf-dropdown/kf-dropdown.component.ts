import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    ContentChildren,
    QueryList,
    AfterViewInit,
    Output,
    ElementRef,
    ViewChild,
    HostBinding,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KfDropdownItemComponent } from '../kf-dropdown-item/kf-dropdown-item.component';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeWhile, filter } from 'rxjs/operators';
import { KfDropdownService } from '../../shared/services/kf-dropdown.service';

@Component({
    selector: 'kf-dropdown',
    templateUrl: './kf-dropdown.component.html',
    styleUrls: ['./kf-dropdown.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: KfDropdownComponent,
            multi: true,
        },
    ],
})
export class KfDropdownComponent implements AfterViewInit, ControlValueAccessor {
    protected _items: QueryList<KfDropdownItemComponent> = new QueryList<KfDropdownItemComponent>();
    protected _alive = true;
    protected _isOpen = false;

    @ContentChildren(KfDropdownItemComponent) protected get items(): QueryList<KfDropdownItemComponent> {
        return this._items;
    }

    protected set items(value: QueryList<KfDropdownItemComponent>) {
        this._items = value;
        this.getItemsWidth();
    }
    protected itemsWidth = 0;

    protected get distanceFromRightOfViewport(): number {
        const hostElement: HTMLElement = this.elementRef.nativeElement;
        const leftSide: number = hostElement.offsetLeft;
        const viewportWidth: number = window.innerWidth;
        return viewportWidth - leftSide;
    }

    public selectedItem: KfDropdownItemComponent = null;
    protected clickAway: Observable<any> = fromEvent(document, 'click')
        .pipe(filter((next: any) => !this.elementRef.nativeElement.contains(next.target) && this.isOpen));
    protected valueOnChange: (value: any) => void = _.noop;
    @Input() public color = 'primary';
    @Input() public textColor = null;
    @Input() public disabled = false;
    @Input() public placeholder = '';
    @Input() public label: string = null;
    @Input() public styleClass = '';
    @Input() public hasIcon = false;
    @Input() public iconClass: string;
    @Input() public relation = false;
    @Output() public opened: EventEmitter<any> = new EventEmitter();
    @Output() public closed: EventEmitter<any> = new EventEmitter();
    @ViewChild('itemsGroup') public itemsGroup: ElementRef;
    @ViewChild('searchInput') public searchInput: ElementRef;
    @HostBinding('class.invalid') @Input() public isInvalid = false;
    private initialValue: any = null;

    public set isOpen(value: boolean) {
        if (value !== this._isOpen) {
            this._isOpen = value;
            if (value) {
                this.opened.emit();
            } else {
                this.closed.emit();
            }
        }
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public get alignRight(): boolean {
        return this.distanceFromRightOfViewport < this.itemsWidth;
    }

    constructor(
        protected elementRef: ElementRef,
        public dropDownService:KfDropdownService,
    ) { }

    protected getItemsWidth() {
        const itemsGroupElement = this.itemsGroup.nativeElement;
        itemsGroupElement.style.display = 'block';
        this.itemsWidth = itemsGroupElement.offsetWidth;
        itemsGroupElement.style.display = '';
    }

    public getClasses(): string {
        return (this.styleClass !== '') ? this.styleClass : `color-${this.color}`;
    }

    public getText(): string {
        if (!this.relation) {
            return _.isNull(this.selectedItem) ? this.placeholder : this.selectedItem.label;
        }
        return this.dropDownService.getValue();
    }

    public getTextColor(): string {
        if (this.disabled || this.hasIcon) {
            return 'medium';
        }
        if (this.textColor) {
            return this.textColor;
        }
        return 'dark';
    }

    public getIconColor(): string {
        if (this.textColor) {
            return this.textColor;
        }
        if (this.isInvalid) {
            return 'danger';
        }
        return this.disabled ? 'grey' : 'primary';
    }

    public itemSelected(item: KfDropdownItemComponent): void {
        if (!_.isNull(this.selectedItem)) {
            this.selectedItem.selected = false;
        }
        this.selectedItem = item;
        this.isOpen = false;
        if (this.searchInput) {
            this.searchInput['value'] = '';
        }
        this.valueOnChange(item.value);
    }

    public subscribeToClickAway() {
        this.clickAway
            .pipe(takeWhile(() => this._alive))
            .subscribe((next: MouseEvent) => {
                this.isOpen = false;
                if (this.searchInput) {
                    this.searchInput['value'] = '';
                }
            });
    }

    public writeValue(value: any): void {
        const selectedItem = this.items.find(item => item.value === value);
        if (!_.isNull(this.selectedItem)) {
            this.selectedItem.selected = false;
        }
        this.selectedItem = _.isUndefined(selectedItem) ? null : selectedItem;
        this.initialValue = this.items.length === 0 ? value : null;
        if (!_.isNull(this.selectedItem)) {
            this.selectedItem.selected = true;
        }
    }

    public registerOnChange(fn: (value: any) => void): void {
        this.valueOnChange = fn;
    }

    public registerOnTouched(): void { }

    public ngAfterViewInit(): void {
        if (!_.isNull(this.initialValue)) {
            this.writeValue(this.initialValue);
        }
        this.subscribeToClickAway();
        this.getItemsWidth();
        this.items.forEach(item => item.registerOnSelect(selectedItem => this.itemSelected(selectedItem)));
        this.items.changes.subscribe(() => (
            this.items.forEach(item => item.registerOnSelect(selectedItem => this.itemSelected(selectedItem)))
        ));
    }

    public forceClose() {
        this.isOpen = false;
    }

    public forceOpen() {
        this.isOpen = true;
    }

    // identifies if #itemsGroup is fully within viewport
    public withinViewport(): boolean {
        const elem = this.itemsGroup.nativeElement;
        const rect = elem.getBoundingClientRect();
        // guard ensures that once an element is align-right, it does not remove element
        if (elem.className.includes('align-right')) { return false; }

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}
