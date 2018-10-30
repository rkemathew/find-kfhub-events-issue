import { Component, Input } from '@angular/core';
import { KfDropdownService } from '../../shared/services/kf-dropdown.service';
import * as _ from 'lodash';

@Component({
    selector: 'kf-dropdown-item',
    templateUrl: './kf-dropdown-item.component.html',
    styleUrls: ['./kf-dropdown-item.component.less'],
})
export class KfDropdownItemComponent {
    private onSelect: (item: KfDropdownItemComponent) => void = _.noop;
    private hovering = false;
    @Input() public label = '';
    @Input() public value: any = null;
    @Input() public description = '';
    @Input() public icon = '';
    @Input() public disabled = false;
    public selected = false;
    public hasCheckbox = false;
    public visible = true;

    constructor(
        public dropDownService:KfDropdownService,
    ) {}

    public click(): void {
        if (!this.disabled) {
            this.selected = true;
            this.onSelect(this);
        }
    }

    public hover(value: boolean): void {
        this.hovering = value;
    }

    public getTextColor(): string {
        return this.disabled ? 'medium' : this.hovering && !this.hasCheckbox ? 'light' : 'dark';
    }

    public registerOnSelect(fn: (item: KfDropdownItemComponent) => void): void {
        this.onSelect = fn;
    }
}
