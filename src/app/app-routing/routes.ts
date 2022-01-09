import { Route, Routes } from "@angular/router";
import { AuthorisationComponent } from "../authorisation/authorisation.component";
import { ScheduleComponent } from "../schedule/schedule.component";

export const routes: Routes = [
    { path: 'schedule', component: ScheduleComponent},
    { path: 'auth', component: AuthorisationComponent},
    { path: '', redirectTo: '/auth', pathMatch: 'full' }
];