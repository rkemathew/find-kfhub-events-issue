import {
    Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges,
} from '@angular/core';
import * as _moment from 'moment-timezone';
import * as _ from 'lodash';

const moment = _moment;

@Component({
    selector: 'kf-calendar',
    templateUrl: './kf-calendar.component.html',
    styleUrls: ['./kf-calendar.component.less'],
})
export class KfCalendarComponent implements OnInit, OnChanges {
    @Input() date: _moment.Moment = moment();
    @Input() locale = 'en';
    @Output() dateChange: EventEmitter<_moment.Moment> = new EventEmitter();
    @Output() applyClick: EventEmitter<_moment.Moment> = new EventEmitter();
    @Output() clearClick: EventEmitter<void> = new EventEmitter();
    public monthName = '';
    public weekdayNames: string[] = [];
    public dayNames: {
        selected: boolean;
        color: string;
        date: _moment.Moment;
        disabled: boolean;
        label: string;
        canSelect: boolean;
    }[] = [];
    @Input() private canSelectDate: (date: _moment.Moment) => boolean = () => true;

    constructor() {
        moment.tz.guess();
    }

    public ngOnInit(): void {
        const date = _.chain(30)
            .times(index => moment().add(index, 'days'))
            .find((day) => {
                const yesterday = moment().subtract(1, 'day');
                return day.isAfter(yesterday) && this.canSelectDate(day);
            })
            .value();
        this.dateChanged(date, this.locale);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('date' in changes || 'locale' in changes) {
            const date = ('date' in changes) ? changes.date.currentValue : this.date;
            const locale = ('locale' in changes) ? changes.locale.currentValue : this.locale;
            this.dateChanged(date, locale);
        }
    }

    private dateChanged(date: _moment.Moment, locale: string): void {
        const localDate = date.locale(locale);
        const days = localDate.daysInMonth();
        const offset = localDate.clone().date(1).weekday();
        this.monthName = localDate.format('MMMM YYYY');
        this.weekdayNames = _.times(7, index => (
            localDate.clone().weekday(index).format('dd')
        ));
        this.dayNames = _.chain((Math.ceil(days / 7) + 1) * 7)
            .times((index) => {
                const dayDate = localDate
                    .clone()
                    .set('date', index + 1 - offset);
                const selected = date.isSame(dayDate);
                return {
                    selected,
                    color: selected ? 'light' : 'dark',
                    date: dayDate,
                    disabled: date.month() !== dayDate.month(),
                    label: dayDate.format('D'),
                    canSelect: this.canSelectDate(dayDate),
                };
            })
            .chunk(7)
            .filter(chunk => _.some(chunk, ['disabled', false]))
            .value();
        this.dateChange.emit(localDate);
    }

    public selectDate(date: _moment.Moment, disabled: boolean, canSelect: boolean): void {
        if (!disabled && canSelect) {
            this.dateChanged(date, this.locale);
        }
    }

    public moveLeft(): void {
        const date = this.date.subtract(1, 'month');
        this.dateChanged(date, this.locale);
    }

    public moveRight(): void {
        const date = this.date.add(1, 'month');
        this.dateChanged(date, this.locale);
    }

    public apply(): void {
        this.applyClick.emit(this.date);
    }

    public clear(): void {
        this.clearClick.emit();
    }
}
