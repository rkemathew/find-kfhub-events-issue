import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: '[kf-text]',
    templateUrl: './kf-text.component.html',
    styleUrls: ['./kf-text.component.less'],
})
export class KfTextComponent {
    @Input() public color = null;
    @Input() public size = null;
    @Input() public transform = null;
    @Input() public weight = null;
    @Input() public nav = false;
    @Input() public subNav = false;
    @Input() public utility = false;

    @HostBinding('class.kf-text') true;
    @HostBinding('class.nav') get isNav(): boolean {
        return this.nav;
    }
    @HostBinding('class.sub-nav') get isSubNav(): boolean {
        return this.subNav;
    }
    @HostBinding('class.utility') get isUtility(): boolean {
        return this.utility;
    }
    @HostBinding('class.color-light') get islight(): boolean {
        return this.color === 'light';
    }
    @HostBinding('class.color-medium') get ismedium(): boolean {
        return this.color === 'medium';
    }
    @HostBinding('class.color-success') get issuccess(): boolean {
        return this.color === 'success';
    }
    @HostBinding('class.color-error') get iserror(): boolean {
        return this.color === 'error';
    }
    @HostBinding('class.color-dark') get isdark(): boolean {
        return this.color === 'dark' || _.isNull(this.color);
    }
    @HostBinding('class.color-primary') get isprimary(): boolean {
        return this.color === 'primary' || this.elementRef.nativeElement.nodeName === 'A' && _.isNull(this.color);
    }
    @HostBinding('class.size-sm') get issm(): boolean {
        return this.size === 'sm';
    }
    @HostBinding('class.size-xs') get isxs(): boolean {
        return this.size === 'xs';
    }
    @HostBinding('class.weight-heavy') get isheavy(): boolean {
        return this.weight === 'heavy';
    }
    @HostBinding('class.weight-strong') get isstrong(): boolean {
        return this.weight === 'strong';
    }
    @HostBinding('class.transform-uppercase') get isuppercase(): boolean {
        return this.transform === 'uppercase';
    }
    @HostBinding('class.transform-capitalize') get iscapitalized(): boolean {
        return this.transform === 'capitalize';
    }

    constructor(
        private elementRef: ElementRef,
    ) {}
}
