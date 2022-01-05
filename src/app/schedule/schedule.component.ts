import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BuildingService } from '../services/building.service';
import { WorkoutService } from '../services/workout.service';
import { baseURL } from '../shared/baseurl';
import { Building, Workout } from '../shared/models';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { expand } from '../animations/app.animations';
import { faThumbsUp, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [
    expand()
  ]
})
export class ScheduleComponent implements OnInit, AfterViewInit{
  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 3,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  faThumbsUp = faThumbsUp
  faTimesCircle = faTimesCircle
  faQuestionCircle = faQuestionCircle

  colors = {
    "на технику": "#245796",
    "силовая": "#2FFF00",
    "другое":"#9EA000",
    "кардио": "#FF5E00",
    "общая": "#FF0000"
  }
  workouts: Workout[]
  errmess: string
  buildings: Building[]
  height: number

  constructor(private workoutService: WorkoutService, private buildingService: BuildingService, private mediaObserver: MediaObserver) { }
  ngAfterViewInit(): void {
    this.mediaObserver.asObservable().subscribe((change) => {
      console.log(change)
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias]
    });
  }

  ngOnInit(): void {
    this.height = window.innerHeight - 60
    console.log(this.height)
       this.workoutService.getWeekWorkouts(4).subscribe(response => {
         this.workouts=response.Workouts
         for(let workout of this.workouts){
           workout.start_date= new Date(workout.start_time)
           workout.end_date = new Date(workout.end_time)
           workout.color = this.colors[workout.type]
         }
         console.log(this.workouts)
        }
         , errmess =>this.errmess=errmess
         )
      this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings, errmess=> this.errmess=errmess)
  }

}
