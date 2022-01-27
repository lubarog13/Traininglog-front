import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../services/building.service';
import { ClubsService } from '../services/clubs.service';
import { UserService } from '../services/user.service';
import { WorkoutService } from '../services/workout.service';
import { CustomValidators } from '../shared/custom-validators';
import { Club, Coach, Hall, Workout, WorkoutForCreate } from '../shared/models';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.scss']
})
export class EditWorkoutComponent implements OnInit {

  workoutForm: FormGroup
  selectedOption = 1

  @Input() workout: Workout

  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()

  halls: Hall[]
  coaches: Coach[]
  clubs: Club[]
  types = ["на технику", "кардио", "силовая", "общая", "другое"]

  formErrors = {
    "club": "",
    "coach": "",
    "hall": "",
    "type": "",
    "start_time": "",
    "end_time": "",
    "other_type": ""
  }
  
  validationMessages = {
    'club': {
      'required': "Выберите группу"
    },
    'coach': {
      'required': "Выберите тренера"
    },
    'hall': {
      'required': "Выберите зал"
    }, 
    "type": {
      'required': "Выберите тип"
    },
    "start_time": {
      'required': "Выберите время"

    },
    "end_time": {
      'required': "Выберите время",
      'TooBig': 'Время должно быть больше времени начала'
    },
    "other_type": {
      'required': "Введите тип"
    }
  }

  constructor(private buildingService: BuildingService, private userService: UserService, private clubService: ClubsService, private fb: FormBuilder, private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.clubService.getClubsForCoach(Number.parseInt(localStorage.getItem("coach_id"))).subscribe(response => {
      this.clubs = response.Clubs
    })
    this.buildingService.getHalls().subscribe(response => {
      this.halls = response
    })
    this.userService.getCoaches().subscribe(response => {
      this.coaches = response
    })
    this.createForm()
  }

  createForm() {
    this.workoutForm = this.fb.group({
      club: [null, Validators.required],
      coach: [null, Validators.required],
      hall: [null, Validators.required],
      type: [null, Validators.required],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      other_type: null
    }, {
      validators: [CustomValidators.timeValidator, CustomValidators.othertypeValidator]
    })
    this.workoutForm.setValue({club: this.workout.club.id, coach: this.workout.coach_replace!=null? this.workout.coach_replace.id:
       this.workout.club.coach.id, hall: this.workout.hall.id, type: this.workout.type, start_time: this.workout.start_date.getUTCHours() + ":" + (this.workout.start_date.getMinutes()<10?'0':'') + this.workout.start_date.getMinutes(),
    end_time: this.workout.end_date.getUTCHours() + ":" + (this.workout.end_date.getMinutes()<10?'0':'') + this.workout.end_date.getMinutes(),
    other_type: this.workout.other_type}
    )
    this.workoutForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  onValueChanged(data?: any) {
    if (!this.workoutForm) { return; }
    const form = this.workoutForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    let workout: WorkoutForCreate
      let date = new Date(this.workout.start_date)
      workout = new WorkoutForCreate(formatDate(date, "yyyy-MM-dd", "en-US") + "T" +this.workoutForm.value["start_time"], formatDate(date, "yyyy-MM-dd", "en-US") + "T" + this.workoutForm.value["end_time"],
      this.workoutForm.value["type"], false, this.workoutForm.value["hall"], this.workoutForm.value["club"], this.workoutForm.value["type"]=="другое"?this.workoutForm.value["other_type"]: null, 
      this.workoutForm.value["coach"]==localStorage.getItem("coach_id")? null: this.workoutForm.value["coach"])
      this.workoutService.editWorkout(workout, this.workout.id).subscribe(response=> {
        this.created.emit('created')
      }, err => console.log(err))
  }
}
