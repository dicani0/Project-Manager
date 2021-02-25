import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MiniSpinnerComponent } from './mini-spinner/mini-spinner.component';



@NgModule({
    declarations: [
        SpinnerComponent,
        MiniSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SpinnerComponent,
        MiniSpinnerComponent
    ]
})
export class SharedModule { }
