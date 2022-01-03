import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BuildingService } from '../services/building.service';
import { WorkoutService } from '../services/workout.service';
import { baseURL } from '../shared/baseurl';
import { Building, Workout } from '../shared/models';
import {MediaChange, MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit{
  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1
  }
  workouts: Workout[]
  errmess: string
  buildings: Building[]

  constructor(private workoutService: WorkoutService, private buildingService: BuildingService, private mediaObserver: MediaObserver) { }
  ngAfterViewInit(): void {
    this.mediaObserver.asObservable().subscribe((change) => {
      console.log(change)
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias]
    });
  }

  ngOnInit(): void {
       this.workoutService.getWeekWorkouts(4).subscribe(response => {
         this.workouts=response.Workouts
         for(let workout of this.workouts){
           workout.start_date= new Date(workout.start_time)
           workout.end_date = new Date(workout.end_time)
         }
         console.log(this.workouts)
        }
         , errmess =>this.errmess=errmess
         )
      this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings, errmess=> this.errmess=errmess)
  }

}
