import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'kf-card',
    templateUrl: './kf-card.component.html',
    styleUrls: ['./kf-card.component.less'],
})
export class KfCardComponent implements OnInit, OnChanges {
    @Input() public backgroundColor = 'white';
    public classes: string = null;

    public ngOnInit(): void {
        this.classes = `card ${this.backgroundColor}`;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (_.has(changes, 'backgroundColor')) {
            const color = changes.backgroundColor.currentValue;
            this.classes = `card ${color}`;
        }
    }
}
