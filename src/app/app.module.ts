import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
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
import { ScheduleComponent } from './schedule/schedule.component';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { BuildingService } from './services/building.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    SidebarModule,
    HttpClientModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [HeaderComponent],
  providers: [
    WorkoutService,
    ProcessHTTPMsgService,
    BuildingService,
    {provide: 'BaseURL', useValue: baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
