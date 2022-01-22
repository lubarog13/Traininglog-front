import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../services/building.service';
import { ClubsService } from '../services/clubs.service';
import { UserService } from '../services/user.service';
import { Club, Coach, Hall } from '../shared/models';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  workoutForm: FormGroup
  selectedOption = 1

  @Output() windowClosed = new EventEmitter()

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
    "date": ""
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

    },
    "end_time": {

    },
    "date": {
      
    }
  }



  constructor(private buildingService: BuildingService, private userService: UserService, private clubService: ClubsService, private fb: FormBuilder) { }

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
      start_time: [null],
      end_time: [null],
      date: [null],
      pn: false,
      vt: false,
      sr: false,
      ch: false,
      pt: false,
      sb: false,
      vs: false
    })
    this.workoutForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
    for (let type of this.types) {
      console.log(type)
    }  
  }

  onSubmit() {

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
    console.log(this.selectedOption)
  }

}
