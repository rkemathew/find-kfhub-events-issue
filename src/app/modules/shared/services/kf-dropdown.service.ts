import { Injectable } from '@angular/core';

@Injectable()
export class KfDropdownService {

    selectedCountry: string;
    loadCountry:any;
    public getValue(): string {
        return this.selectedCountry;
    }

    public setValue(value: string): void {
        this.selectedCountry = value;
    }

    public getCountry(): any {
        return this.loadCountry;
    }

    public setCountry(value: any): void {
        this.loadCountry = value;
    }
}
