import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamModule } from './team/team.module';
import { SharedModule } from './shared/shared.module';
import { ProjectModule } from './project/project.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        TeamModule,
        SharedModule,
        ProjectModule
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
