import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BuildingService } from '../services/building.service';
import { WorkoutService } from '../services/workout.service';
import { baseURL } from '../shared/baseurl';
import { Building, SimplePresence, Workout, Presence } from '../shared/models';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { expand } from '../animations/app.animations';
import { faThumbsUp, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { PresenceService } from '../services/presence.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  @ViewChild('reasonform') reasonFormDirective;

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
  whoGoes: SimplePresence[]
  whoNotGoes: SimplePresence[]
  whoDontKnow: SimplePresence[]
  reasonForm: FormGroup
  sendReason: Map<number,boolean> = new Map<number,boolean>()
  currentWorkoutId=0
  isOpen = false

  colors = {
    "на технику": "#245796",
    "силовая": "#2FFF00",
    "другое":"#9EA000",
    "кардио": "#FF5E00",
    "общая": "#FF0000"
  }
  workouts: Workout[]
  errmess: string
  height: number
  presences: Map<number, boolean> = new Map<number,boolean>()

  constructor(private workoutService: WorkoutService, private presenceService: PresenceService,private mediaObserver: MediaObserver, private fb: FormBuilder) 
  { 
    this.createForm()
  }
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
  }

  createForm() {
    this.reasonForm = this.fb.group({
      reason: ['', [Validators.required]]
    })
  }

  getPresences(id: number): void {
    if(!this.isOpen || id!=this.currentWorkoutId){
      this.presenceService.getPresencesForWorkout(id).subscribe((response)=> {
        this.whoGoes = response.Presences.filter((presence) => presence.is_attend==true)
        this.whoNotGoes = response.Presences.filter((presence) => presence.is_attend==false)
        this.whoDontKnow = response.Presences.filter((presence) => presence.is_attend==null)
        this.currentWorkoutId=id
        this.isOpen=true
      })
    } else {
      this.whoGoes=undefined
      this.whoNotGoes=undefined
      this.whoDontKnow=undefined
      this.currentWorkoutId=0
      this.isOpen=false
    }
  }


  updatePresence(workout_id: number, is_attend: boolean, reason: string): void {
    var err = ""
    if(is_attend==false && reason==null){
      this.sendReason.set(workout_id,true)
    } else if (is_attend==false) {
      this.sendReason.set(workout_id, false)
    }
    this.presenceService.updatePresence(4, workout_id, new Presence(is_attend, reason)).subscribe((request) => console.log("req", request), errmess=> err=errmess)
    if(err!="") {
      console.log(err)
      return
    }
    for(let workout of this.workouts) {
      if(workout.id==workout_id){
        workout.is_on=is_attend
        return
      }
    }
  }

  onSubmit(workout_id: number) {
      this.updatePresence(workout_id, false, this.reasonForm.value['reason'])
  }

}
