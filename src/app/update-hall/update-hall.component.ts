import { Component, EventEmitter, OnInit, Output, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../services/building.service';
import { Building, Hall, HallForCreate } from '../shared/models';

@Component({
  selector: 'app-update-hall',
  templateUrl: './update-hall.component.html',
  styleUrls: ['./update-hall.component.scss']
})
export class UpdateHallComponent implements OnInit {

  hallForm: FormGroup

  @Output() windowClosed = new EventEmitter()
  @Output() created = new EventEmitter()
  @Input() hall: Hall
  time = new Date().getTime()

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
    }

  }

  constructor(private fb: FormBuilder, private buildingService: BuildingService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.createForm()
    this.buildingService.getBuildings().subscribe(res => {
      this.buildings = res
    })
  }

  createForm() {
    console.log(this.hall)
    this.hallForm = this.fb.group({
      name: [this.hall.name, [Validators.required, Validators.minLength(2)]],
      number: [this.hall.number, [Validators.min(0)]],
      building: [this.hall.building.id, Validators.required],
      occupancy: [this.hall.occupancy,[Validators.required, Validators.min(0)]],
      image: [null]
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
    if (this.hallForm.value['image']!=null){
    this.buildingService.updateHall(this.hall.id, hall).subscribe(res => {
      this.buildingService.postHallFile(this.hallForm.value['image'], this.hall.id).subscribe(res => {
        this.created.emit("created")
      }, err => console.log(err))
    }, err => console.log(err))
  } else {
    this.buildingService.updateHall(this.hall.id, hall).subscribe(res => {
        this.created.emit("created")
    }, err => console.log(err))

  }
  }


}
