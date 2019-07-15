import { AlertRef, AlertConfig } from 'fundamental-ngx';
import { Component } from '@angular/core';

@Component({
    selector: 'fd-alert-content',
    template: `<div>{{ ref.data.label }}</div>`
})
export class ErrorHandlingComponent {
    public static CONFIG: Partial<AlertConfig> = {
        type: 'error',
        duration: 5000,
        width: '450px'
    };

    constructor(public ref: AlertRef) {
    }
}
