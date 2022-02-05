import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSidenavModule} from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule } from '@angular/material/menu'
import { WorkoutService } from './services/workout.service';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { MatRadioModule } from '@angular/material/radio'
import { ScheduleComponent } from './schedule/schedule.component';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { BuildingService } from './services/building.service';
import { MaterialElevationDirective } from './animations/material-elevation.directive';
import {MatFormFieldModule} from '@angular/material/form-field'
import { PresenceService } from './services/presence.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import { AuthorisationComponent } from './authorisation/authorisation.component'
import {MatInputModule} from '@angular/material/input'
import { AuthService } from './services/auth.service';
import { SharedService } from './shared/sharedservice';
import { RegistrationComponent } from './registration/registration.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { BuildingsComponent } from './buildings/buildings.component';
import { HallsComponent } from './halls/halls.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClubsComponent } from './clubs/clubs.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { CoachesComponent } from './coaches/coaches.component';
import {YouTubePlayerModule} from '@angular/youtube-player'
import { 
	IgxPieChartModule,
	IgxLegendModule,
	IgxItemLegendModule,
  IgxCategoryChartModule
 } from "igniteui-angular-charts";
 import { IgxCarouselModule,
	IgxSliderModule} from "igniteui-angular";
import { AnalysisComponent } from './analysis/analysis.component';
import { MessagesComponent } from './messages/messages.component';
import { UserService } from './services/user.service';
import { MessagesService } from './services/messages.service';
import { AddMessageComponent } from './add-message/add-message.component';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoachWorkoutCardComponent } from './coach-workout-card/coach-workout-card.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { LogComponent } from './log/log.component';
import {MatTableModule} from '@angular/material/table';
import { CoachAnalysisComponent } from './coach-analysis/coach-analysis.component';
import { AddClubComponent } from './add-club/add-club.component';
import { AddSignupComponent } from './add-signup/add-signup.component';
import { BidDialogComponent } from './bid-dialog/bid-dialog.component';
import { CreateBuildingComponent } from './create-building/create-building.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { EditBuildingComponent } from './edit-building/edit-building.component';



@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    MaterialElevationDirective,
    AuthorisationComponent,
    RegistrationComponent,
    SubmitDialogComponent,
    BuildingsComponent,
    HallsComponent,
    ClubsComponent,
    CoachesComponent,
    AnalysisComponent,
    MessagesComponent,
    AddMessageComponent,
    AnswerDialogComponent,
    EditProfileComponent,
    FooterComponent,
    AboutusComponent,
    CoachWorkoutCardComponent,
    AddWorkoutComponent,
    EditWorkoutComponent,
    LogComponent,
    CoachAnalysisComponent,
    AddClubComponent,
    AddSignupComponent,
    BidDialogComponent,
    CreateBuildingComponent,
    EditBuildingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatRadioModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSidenavModule,
    NgxMatFileInputModule,
    BrowserAnimationsModule,
    SidebarModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    GoogleMapsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule,
    IgxPieChartModule,
	IgxLegendModule,
	IgxItemLegendModule,
  IgxCategoryChartModule,
  IgxCarouselModule,
	IgxSliderModule,
  YouTubePlayerModule,
  MatProgressBarModule
  ],
  providers: [
    WorkoutService,
    ProcessHTTPMsgService,
    BuildingService,
    PresenceService,
    AuthService,
    SharedService,
    UserService,
    MessagesService,
    {provide: 'BaseURL', useValue: baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
