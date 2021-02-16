import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        BrowserModule
    ]
})
export class AuthModule { }
