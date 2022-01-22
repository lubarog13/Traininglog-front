import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../services/building.service';
import { ClubsService } from '../services/clubs.service';
import { UserService } from '../services/user.service';
import { WorkoutService } from '../services/workout.service';
import { CustomValidators } from '../shared/custom-validators';
import { Club, Coach, Hall, WorkoutForCreate } from '../shared/models';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  workoutForm: FormGroup
  selectedOption = 1
  value: number
  totalCount = 0
  checkedErr: string

  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()

  halls: Hall[]
  coaches: Coach[]
  clubs: Club[]
  types = ["на технику", "кардио", "силовая", "общая", "другое"]
  days = {
    1: "pn",
    2: "vt",
    3: "sr",
    4: "ch",
    5: 'pt',
    6: 'sb',
    7: 'vs'
  }

  formErrors = {
    "club": "",
    "coach": "",
    "hall": "",
    "type": "",
    "start_time": "",
    "end_time": "",
    "date": "",
    "start_date": "",
    "end_date": "",
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
    "date": {
      'required': "Выберите дату",
      'TooSmall': "Выберите предстоящую дату"
    },
    "start_date": {
      'required': "Выберите дату",
      'TooSmall': "Выберите предстоящую дату"
    },
    "end_date": {
      'required': "Выберите дату",
      'TooBig': 'Дата должна быть больше даты начала',
      'TooSmall': "Выберите предстоящую дату"
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
      selectedOption: [1],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      date: [null],
      pn: false,
      vt: false,
      sr: false,
      ch: false,
      pt: false,
      sb: false,
      vs: false,
      start_date: null,
      end_date: null,
      other_type: null
    }, {
      validators: [CustomValidators.fieldsRequiredValidator, CustomValidators.dateTimeValidator, CustomValidators.othertypeValidator]
    })
    this.workoutForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  onSubmit() {
    if(this.workoutForm.value["pn"]==false && this.workoutForm.value["vt"]==false && this.workoutForm.value["sr"]==false 
    && this.workoutForm.value["ch"]==false && this.workoutForm.value["pt"]==false && this.workoutForm.value["sb"]==false && this.workoutForm.value["vs"]==false) {
      this.checkedErr = "Выберите дни недели"
    } else {
      this.checkedErr=undefined
    }
    console.log(this.workoutForm.value)
    if(this.selectedOption==1){
    let workout: WorkoutForCreate
      let date = new Date(this.workoutForm.value["date"])
      workout = new WorkoutForCreate(formatDate(date, "yyyy-MM-dd", "en-US") + "T" +this.workoutForm.value["start_time"], formatDate(date, "yyyy-MM-dd", "en-US") + "T" + this.workoutForm.value["end_time"],
      this.workoutForm.value["type"], false, this.workoutForm.value["hall"], this.workoutForm.value["club"], this.workoutForm.value["type"]=="другое"?this.workoutForm.value["other_type"]: null, 
      this.workoutForm.value["coach"]==localStorage.getItem("coach_id")? null: this.workoutForm.value["coach"])
      this.workoutService.createWorkout(workout).subscribe(response=> {
        this.created.emit('created')
      }, err => console.log(err))
    } else {
      this.value = 0
      let start_date = new Date(this.workoutForm.value["start_date"])
      let end_date = new Date(this.workoutForm.value["end_date"])
      while (start_date<=end_date) {
        if(start_date.toDateString() == new Date().toDateString()) {
          start_date.setDate(start_date.getDate() + 1)
          continue
        }
        if( this.workoutForm.value[this.days[start_date.getDay()]] == true ) {
        this.totalCount+=1
        }
        start_date.setDate(start_date.getDate() + 1)
      }
      console.log(this.totalCount)
      start_date = new Date(this.workoutForm.value["start_date"])
      while (start_date<=end_date) {
          if(start_date.toDateString() == new Date().toDateString()) {
            start_date.setDate(start_date.getDate() + 1)
            continue
          }
          if( this.workoutForm.value[this.days[start_date.getDay()]] == true ) {
            let workout = new WorkoutForCreate(formatDate(start_date, "yyyy-MM-dd", "en-US") + "T" +this.workoutForm.value["start_time"], formatDate(start_date, "yyyy-MM-dd", "en-US") + "T" + this.workoutForm.value["end_time"],
            this.workoutForm.value["type"], false, this.workoutForm.value["hall"], this.workoutForm.value["club"], this.workoutForm.value["type"]=="другое"?this.workoutForm.value["other_type"]: null, 
            this.workoutForm.value["coach"]==localStorage.getItem("coach_id")? null: this.workoutForm.value["coach"])
            this.workoutService.createWorkout(workout).subscribe(response=> {
              this.value += 100/this.totalCount;
            }, err => {
              console.log(err)
            })
          }
          start_date.setDate(start_date.getDate() + 1)
      }
      this.created.emit("created") 
    }
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

}
