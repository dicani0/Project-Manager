import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'teams', component: TeamComponent, canActivate: [LoggedInAuthGuard] },
    { path: 'projects', component: ProjectComponent, canActivate: [LoggedInAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
