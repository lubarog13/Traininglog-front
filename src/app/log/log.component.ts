import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { PresenceService } from '../services/presence.service';
import { WorkoutService } from '../services/workout.service';
import { Presence, Workout, SimplePresence, PresenceForCreate, User } from '../shared/models';
import { expand } from '../animations/app.animations';
import { group } from 'console';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  animations: [
    expand()
  ]
})
export class LogComponent implements OnInit, AfterViewInit {

  workouts: Workout[]
  selected_date = new Date()
  myFilter = (d: Date | null): boolean => {
    return true
  };
  day_workouts: Workout[];
  presences: Presence[];
  displayedColumns: string[] = ['name', 'is_attend', 'not_attend', 'delay', 'early_ret', 'reason'];

  constructor(private workoutService: WorkoutService, private presenceService: PresenceService, private renderer: Renderer2, public dialog: MatDialog) { }


  ngAfterViewInit(): void {
    const monthPrevBtn = document.querySelectorAll(
        '.mat-calendar-previous-button'
      );
      const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');
  
      if (monthPrevBtn) {
        Array.from(monthPrevBtn).forEach((button) => {
          this.renderer.listen(button, 'click', (event) => {
            this.selected_date.setMonth(this.selected_date.getMonth() -1)
            this.getPresences()
            this.reloadWorkouts()
          });
        });
      }
  
      if (monthNextBtn) {
        Array.from(monthNextBtn).forEach((button) => {
          this.renderer.listen(button, 'click', (event) => {
            this.selected_date.setMonth(this.selected_date.getMonth() +1)
            this.getPresences()
            this.reloadWorkouts()
          });
        });
      }
  }

  ngOnInit(): void {
    this.reloadWorkouts()
    this.getPresences()
  }


  getPresences() {
    this.presenceService.getPresencesForDay(this.selected_date).subscribe(response => {
      this.presences = response.Presences
      this.day_workouts = this.presences.map(presence => presence.workout)
      this.day_workouts = this.day_workouts.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id
      )))
      this.day_workouts = this.day_workouts.sort((a, b) => <any>new Date(b.start_time) - <any>new Date(a.start_time))
    }, err => {
      console.log(err)
    })
  }

  reloadWorkouts() {
    this.workoutService.getMonthWorkoutsForCoach(Number.parseInt(localStorage.getItem("coach_id")), this.selected_date.getMonth() + 1, this.selected_date.getFullYear()).subscribe(response =>{
      this.workouts = response.Workouts
      for(let workout of this.workouts){
        workout.start_date= new Date(workout.start_time)
        workout.end_date = new Date(workout.end_time)
      }
      this.myFilter = (d: Date | null): boolean => {
        for(let workout of this.workouts) {
          if(workout.start_date.getDate()==d.getDate()) return true
        }
        return false
      };
    }, 
      err => console.log(err)
    )
  }

  dateClick(d: Date) {
    if(d.toDateString()!=this.selected_date.toDateString()) {
    this.selected_date = d
    this.reloadWorkouts()
    } else this.selected_date = d
    this.getPresences()
  }
  getPresencesByWorkoutId(id: number): Presence[] {
    return this.presences.filter(presence =>  presence.workout.id == id)
  }


  updatePresence(presence: Presence) {
    this.presenceService.updatePresenceSimple(new PresenceForCreate(presence)).subscribe(response=> this.reloadWorkouts, err=> console.log(err))
  }

  openDialog(user: User) {
    let dialogRef = this.dialog.open(UserInfoComponent, {data: { user: user}})
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

