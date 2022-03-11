import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BuildingService } from '../services/building.service';
import { WorkoutService } from '../services/workout.service';
import { baseURL } from '../shared/baseurl';
import { Building, SimplePresence, Workout, Presence, User, WorkoutForCreate } from '../shared/models';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { expand } from '../animations/app.animations';
import { faThumbsUp, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { PresenceService } from '../services/presence.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info.component';

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
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  faThumbsUp = faThumbsUp
  faTimesCircle = faTimesCircle
  faQuestionCircle = faQuestionCircle
  openAddForm = false
  openEditForm = false
  editedWorkout: Workout
  whoGoes: SimplePresence[]
  whoNotGoes: SimplePresence[]
  whoDontKnow: SimplePresence[]
  reasonForm: FormGroup
  sendReason: Map<number,boolean> = new Map<number,boolean>()
  is_coach: boolean
  headerText = "Тренировки на неделе"
  months = ["январе", "феврале", "марте", "апреле", "мае", "июне", "июле", "августе", "сентябре", "октябре", "ноябре", "декабре"]
  currentWorkoutId=0
  isOpen = false
  loading = false

  myFilter = (d: Date | null): boolean => {
    return true
  };

  colors = {
    "на технику": "#245796",
    "силовая": "#2FFF00",
    "другое":"#9EA000",
    "кардио": "#FF5E00",
    "общая": "#FF0000"
  }
  workouts: Workout[]
  monthWorkouts: Workout[]
  errmess: string
  currentMonth = new Date()
  height: number
  presences: Map<number, boolean> = new Map<number,boolean>()
  selected_date = new Date()
  constructor(private workoutService: WorkoutService, private presenceService: PresenceService,private mediaObserver: MediaObserver, private fb: FormBuilder
    , private renderer: Renderer2, public dialog: MatDialog) 
  { 
    this.createForm()
  }
  ngAfterViewInit(): void {
    this.mediaObserver.asObservable().subscribe((change) => {
      console.log(change)
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias]
      this.height = window.innerHeight - 70
    });
      const monthPrevBtn = document.querySelectorAll(
        '.mat-calendar-previous-button'
      );
      const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');
  
      if (monthPrevBtn) {
        Array.from(monthPrevBtn).forEach((button) => {
          this.renderer.listen(button, 'click', (event) => {
            this.currentMonth.setMonth(this.currentMonth.getMonth() -1)
            this.selected_date = this.currentMonth
            this.monthSelected()
          });
        });
      }
  
      if (monthNextBtn) {
        Array.from(monthNextBtn).forEach((button) => {
          this.renderer.listen(button, 'click', (event) => {
            this.currentMonth.setMonth(this.currentMonth.getMonth() +1)
            this.selected_date = this.currentMonth
            this.monthSelected()
          });
        });
      }
  }

  ngOnInit(): void {
    this.is_coach =  localStorage.getItem("is_coach")=="true"
    this.height = window.innerHeight - 500
    console.log(localStorage.getItem("coach_id"))
    this.loading = true
    if (localStorage.getItem("is_coach")=="true") {
      this.workoutService.getMonthWorkoutsForCoach(Number.parseInt(localStorage.getItem("coach_id")), new Date().getMonth() + 1, new Date().getFullYear()).subscribe(
        response => {
          this.monthWorkouts=response.Workouts
          for(let workout of this.monthWorkouts){
            workout.start_date= new Date(workout.start_time)
            workout.end_date = new Date(workout.end_time)
            workout.color = this.colors[workout.type]
          }
          console.log(this.monthWorkouts)
          this.myFilter = (d: Date | null): boolean => {
            for(let workout of this.monthWorkouts) {
              if(workout.start_date.getDate()==d.getDate()) return true
            }
            return false
          };
          this.loading = false
         }
          , errmess => {
            this.errmess=errmess
            this.loading = false
          }
       )  
    }
    else {
      
      this.workoutService.getMonthWorkouts(Number.parseInt( localStorage.getItem("id")), new Date().getMonth() + 1, new Date().getFullYear()).subscribe(
      response => {
        this.monthWorkouts=response.Workouts
        for(let workout of this.monthWorkouts){
          workout.start_date= new Date(workout.start_time)
          workout.end_date = new Date(workout.end_time)
          workout.color = this.colors[workout.type]
        }
        console.log(this.monthWorkouts)
        this.myFilter = (d: Date | null): boolean => {
          for(let workout of this.monthWorkouts) {
            if(workout.start_date.getDate()==d.getDate()) return true
          }
          return false
        };
        this.loading = false
       }
        , errmess => {
          this.errmess=errmess
          this.loading = false
        }
     )  
      }
      this.loading = true
       this.workoutService.getWeekWorkouts(localStorage.getItem("is_coach")=="true"? Number.parseInt(localStorage.getItem("coach_id")): Number.parseInt(localStorage.getItem("id")), localStorage.getItem("is_coach")).subscribe(response => {
         this.workouts=response.Workouts
         for(let workout of this.workouts){
           workout.start_date= new Date(workout.start_time)
           workout.end_date = new Date(workout.end_time)
           workout.color = this.colors[workout.type]
         }
         console.log(this.workouts)
         this.loading = false
        }
         , errmess => {
           this.errmess=errmess
           this.loading = false
         }
         )
  }

  createForm() {
    this.reasonForm = this.fb.group({
      reason: ['', [Validators.required]]
    })
  }

  getPresences(id: number): void {
    if(!this.isOpen || id!=this.currentWorkoutId){
      this.loading = true
      this.presenceService.getPresencesForWorkout(id).subscribe((response)=> {
        this.whoGoes = response.Presences.filter((presence) => presence.is_attend==true)
        this.whoNotGoes = response.Presences.filter((presence) => presence.is_attend==false)
        this.whoDontKnow = response.Presences.filter((presence) => presence.is_attend==null)
        this.currentWorkoutId=id
        this.isOpen=true
        this.loading = false
      }, err => {
        this.errmess = err
        this.loading = false
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
    this.loading = true
    this.presenceService.updatePresence(Number.parseInt( localStorage.getItem("id")), workout_id, new Presence(is_attend, reason)).subscribe((request) => this.loading = false, errmess=> {
      this.errmess=errmess
      this.loading = false
    })
    if(err!="") {
     this.errmess = err
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

  monthSelected() {
    console.log('ok')
    this.headerText = "Тренировки в " + this.months[this.currentMonth.getMonth()]
    this.loading = true
    if (localStorage.getItem("is_coach")=="true") {
      this.workoutService.getMonthWorkoutsForCoach(Number.parseInt(localStorage.getItem("coach_id")), this.currentMonth.getMonth() + 1, this.currentMonth.getFullYear()).subscribe(
        response => {
          this.monthWorkouts=response.Workouts
          for(let workout of this.monthWorkouts){
            workout.start_date= new Date(workout.start_time)
            workout.end_date = new Date(workout.end_time)
            workout.color = this.colors[workout.type]
          }
          console.log(this.monthWorkouts)
          this.myFilter = (d: Date | null): boolean => {
            for(let workout of this.monthWorkouts) {
              if(workout.start_date.getDate()==d.getDate()) return true
            }
            return false
          };
          this.workouts = this.monthWorkouts
          this.loading = false
         }
          , errmess => {
            this.errmess=errmess
            this.loading = false
          }
       )  
    }
    else this.workoutService.getMonthWorkouts(Number.parseInt( localStorage.getItem("id")), this.currentMonth.getMonth() +1, this.currentMonth.getFullYear()).subscribe(
      response => {
        this.monthWorkouts=response.Workouts
        for(let workout of this.monthWorkouts){
          workout.start_date= new Date(workout.start_time)
          workout.end_date = new Date(workout.end_time)
          workout.color = this.colors[workout.type]
        }
        console.log(this.monthWorkouts)
        this.myFilter = (d: Date | null): boolean => {
          for(let workout of this.monthWorkouts) {
            if(workout.start_date.getDate()==d.getDate()) return true
          }
          return false
        };
        this.workouts = this.monthWorkouts
        this.loading = false
       }
        , errmess => {
          this.errmess=errmess
          this.loading = false
        }
     )  
  }

  dateClick(d: Date) {
    this.headerText = "Тренировки "+ d.toLocaleDateString()
    this.workouts = this.monthWorkouts.filter(workout => workout.start_date.getDate()==d.getDate())
    this.selected_date = d
  }

  openDialog(user: User) {
    let dialogRef = this.dialog.open(UserInfoComponent, {data: { user: user}})
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cancelWorkout(workout: Workout) {
    const wfc: WorkoutForCreate = new WorkoutForCreate(workout.start_time, workout.end_time, workout.type, true, workout.hall.id, workout.club.id, workout.other_type, workout.coach_replace? workout.coach_replace.id: null)
      this.workoutService.editWorkout(wfc, workout.id).subscribe(res => {
          this.workoutService.sendNotification(workout).subscribe(()=> alert("Вы отменили тренировку"),err => this.errmess = err)
      }, err => {
        this.errmess = err
      })
  }

}
