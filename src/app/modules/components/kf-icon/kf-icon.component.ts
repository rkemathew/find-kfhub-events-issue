import {
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ElementRef,
} from '@angular/core';

export const AVAILABLE_ICONS: string[] = [
    'add',
    'inquiry',
    'info',
    'alert',
    'profile-function',
    'profile-task',
    'profile-level',
    'arrow-down',
    'arrow-up',
    'drop-up',
    'drop-down',
    'ban-line',
    // 'ban-solid .path1',
    // 'ban-solid .path2',
    'best-in-class',
    'profile-level',
    'profile-function',
    'profile-task',
    'checkbox-check',
    'check-line',
    // 'check-solid .path1',
    // 'check-solid .path2',
    // 'check-solid .path3',
    'clock-line',
    // 'clock-solid .path1',
    // 'clock-solid .path2',
    // 'clock-solid .path3',
    'close-large',
    'close',
    'custom',
    'date-picker',
    'details',
    'filter',
    'help',
    'location',
    'profile',
    'reports',
    'search',
    'settings',
    'upload',
    'download',
    'usage-stats',
    'zoom',
    'clm',
    'users',
    'orders',
    'plus',
    'minus',
    'dots-three-horizontal',
    'home',
    'lock',
];

@Component({
    selector: 'kf-icon',
    templateUrl: './kf-icon.component.html',
    styleUrls: ['./kf-icon.component.less'],
})
export class KfIconComponent implements OnChanges, OnInit {
    @HostBinding('class.kf-icons') get isIcon(): boolean { return true; }
    /**
     * Color options:
     * - primary (blue)
     * - light (white)
     * - dark (black)
     * - danger (red)
     * - warning (yellow)
     * - success (green)
     * - grey/gray (grey)
     */
    @Input() color = 'primary';
    /**
     * See Icomoon or sandbox `app/design/kf-icon` for icon options
     */
    @Input() icon: string = null;
    @Input() set iconImage(value: string) {
        const iconsRegex: RegExp = new RegExp(`(${AVAILABLE_ICONS.join('|')})`, 'i');
        try {
            this.icon = value.match(iconsRegex)[0];
        } catch (error) {
            console.error(`Unsupported iconImage in kf-icon: ${value}`);
        }
    }
    /**
     * size options:
     * - sm
     * - md
     * - lg
     * - xl
     */
    @Input() size = 'md';

    constructor(
        private elementRef: ElementRef,
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color) {
            this.elementRef.nativeElement.classList.remove(changes.color.previousValue);
            this.elementRef.nativeElement.classList.add(changes.color.currentValue);
        }
        if (changes.icon) {
            this.elementRef.nativeElement.classList.remove(`kf-icon-${changes.icon.previousValue}`);
            this.elementRef.nativeElement.classList.add(`kf-icon-${changes.icon.currentValue}`);
        }
        if (changes.iconImage) {
            this.elementRef.nativeElement.classList.add(`kf-icon-${this.icon}`);
        }
        if (changes.size) {
            this.elementRef.nativeElement.classList.remove(`kf-icon-size-${changes.size.previousValue}`);
            this.elementRef.nativeElement.classList.add(`kf-icon-size-${changes.size.currentValue}`);
        }
    }

}
