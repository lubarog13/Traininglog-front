import { Route, Routes } from "@angular/router";
import { AboutusComponent } from "../aboutus/aboutus.component";
import { AnalysisComponent } from "../analysis/analysis.component";
import { AuthorisationComponent } from "../authorisation/authorisation.component";
import { BuildingsComponent } from "../buildings/buildings.component";
import { ClubsComponent } from "../clubs/clubs.component";
import { CoachesComponent } from "../coaches/coaches.component";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { HallsComponent } from "../halls/halls.component";
import { MessagesComponent } from "../messages/messages.component";
import { RegistrationComponent } from "../registration/registration.component";
import { ScheduleComponent } from "../schedule/schedule.component";

export const routes: Routes = [
    { path: 'schedule', component: ScheduleComponent},
    { path: 'auth', component: AuthorisationComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'info/buildings', component: BuildingsComponent},
    { path: 'info/halls', component: HallsComponent},
    { path: 'info/clubs', component: ClubsComponent},
    { path: 'info/coaches', component: CoachesComponent},
    {path: 'analysis', component: AnalysisComponent},
    {path: 'profile/messages', component: MessagesComponent},
    {path: 'profile/edit', component: EditProfileComponent},
    {path: "aboutus", component: AboutusComponent},
    { path: '', redirectTo: '/schedule', pathMatch: 'full' }
];