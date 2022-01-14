import { Route, Routes } from "@angular/router";
import { AuthorisationComponent } from "../authorisation/authorisation.component";
import { BuildingsComponent } from "../buildings/buildings.component";
import { ClubsComponent } from "../clubs/clubs.component";
import { HallsComponent } from "../halls/halls.component";
import { RegistrationComponent } from "../registration/registration.component";
import { ScheduleComponent } from "../schedule/schedule.component";

export const routes: Routes = [
    { path: 'schedule', component: ScheduleComponent},
    { path: 'auth', component: AuthorisationComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'info/buildings', component: BuildingsComponent},
    { path: 'info/halls', component: HallsComponent},
    { path: 'info/clubs', component: ClubsComponent},
    { path: '', redirectTo: '/schedule', pathMatch: 'full' }
];