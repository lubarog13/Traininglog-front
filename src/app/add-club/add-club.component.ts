import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubsComponent } from '../clubs/clubs.component';
import { BuildingService } from '../services/building.service';
import { ClubsService } from '../services/clubs.service';
import { Building, ClubForCreate } from '../shared/models';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.scss']
})
export class AddClubComponent implements OnInit {
  clubForm: FormGroup
  buildings: Building[]
  @Output() clubCreated = new EventEmitter()
  @Output() windowClosed = new EventEmitter()

  formErrors = {
    'name': '',
    'building': '',
    'group':''
  }

  validationMessages = {
    'name': {
      'required': "Название должно быть заполнено",
      'minlength': "Слишком короткое название"
    },
    'building': {
      'required': 'Выберите здание'
    },
    'group': {
      'required': "Название группы должно быть заполнено",
      'minlength': "Слишком короткое название группы"
    }
  }

  constructor(private buildingService: BuildingService, private fb: FormBuilder, private clubService: ClubsService) { }

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe(response => {
      this.buildings = response
      this.createForm()
    })
  }

  createForm() {
    this.clubForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      building: [null, Validators.required],
      group: ["", [Validators.required, Validators.minLength(3)]]
    })
    this.clubForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  onSubmit() {
    var clubForCreate: ClubForCreate = this.clubForm.value
    clubForCreate.coach = Number.parseInt(localStorage.getItem("coach_id"))
    this.clubService.createClub(clubForCreate).subscribe(res => {
      this.clubCreated.emit("created")
    })

  }

  onValueChanged(data?: any) {
    if (!this.clubForm) { return; }
    const form = this.clubForm;
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
