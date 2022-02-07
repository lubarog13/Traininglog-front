import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../services/building.service';
import { Building, HallForCreate } from '../shared/models';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.scss']
})
export class CreateHallComponent implements OnInit {

  hallForm: FormGroup

  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()

  buildings: Building[]

  formErrors = {
    'name': '',
    'number': '',
    'building': '',
    'occupancy': '',
    'image': ''
  }
  validationMessages = {
    'name': {
      'required': 'Введите название зала',
      'minlength': 'Название должно быть больше 2 символов'
    },
    'number': {
      'min': 'Число должнь быть положительным'
    },
    'building': {
      'required': 'Выберите зал'
    },
    'occupancy': {
      'required': 'Введите максимальное количество человек',
      'min': 'Число должнь быть положительным'
    },
    'image': {
      'required': 'Добавьте изображение'
    }

  }

  constructor(private fb: FormBuilder, private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe(res => {
      this.buildings = res
      this.createForm()
    })
  }

  createForm() {
    this.hallForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      number: [null, [Validators.min(0)]],
      building: [null, Validators.required],
      occupancy: [null,[Validators.required, Validators.min(0)]],
      image: [null, Validators.required]
    })
    this.hallForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  onValueChanged(data?: any) {
    if (!this.hallForm) { return; }
    const form = this.hallForm;
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
  onSubmit(){
    var hall: HallForCreate = this.hallForm.value
    this.buildingService.createHall(hall).subscribe(res => {
      this.buildingService.postHallFile(this.hallForm.value['image']).subscribe(res => {
        this.created.emit("created")
      }, err => console.log(err))
    }, err => console.log(err))
  }

}
