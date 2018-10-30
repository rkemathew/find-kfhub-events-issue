import { Component, OnInit, OnDestroy, DoCheck, OnChanges } from '@angular/core';

@Component({
    selector: 'app-ronnie-dummy',
    templateUrl: './ronnie-dummy.component.html',
    styleUrls: ['./ronnie-dummy.component.less']
})
export class RonnieDummyComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    ngOnInit() {
        console.log('RonnieDummmyComponent ngOnInit() fired');
    }

    ngOnDestroy() {
        console.log('RonnieDummmyComponent ngOnDestroy() fired');
    }

    ngDoCheck() {
        console.log('RonnieDummmyComponent ngDoCheck() fired');
    }

    ngOnChanges() {
        console.log('RonnieDummmyComponent ngOnChanges() fired');
    }
}
