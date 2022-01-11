import { Route, Routes } from "@angular/router";
import { AuthorisationComponent } from "../authorisation/authorisation.component";
import { BuildingsComponent } from "../buildings/buildings.component";
import { RegistrationComponent } from "../registration/registration.component";
import { ScheduleComponent } from "../schedule/schedule.component";

export const routes: Routes = [
    { path: 'schedule', component: ScheduleComponent},
    { path: 'auth', component: AuthorisationComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'info/buildings', component: BuildingsComponent},
    { path: '', redirectTo: '/schedule', pathMatch: 'full' }
];