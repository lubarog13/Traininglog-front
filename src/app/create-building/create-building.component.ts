import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../services/building.service';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.scss']
})
export class CreateBuildingComponent implements OnInit {

  buildingForm: FormGroup
  center: google.maps.LatLngLiteral
  errMess: String
  formErrors = {
    'name': '',
    'city': '',
    'address': '',
    'number': '',
    'liter': '',
    'lat': '',
    'lng': '',
    'image': ''
  }

  validationMessages = {
    'name': {
      'required': 'Введите название здания',
      'minlength': 'Название должно быть больше 2 символов',
      'maxlength': 'Название должно быть меньше 100 символов'
    },
    'city': {
      'required': 'Введите город',
      'minlength': 'Город должен быть больше 2 символов',
      'maxlength': 'Название города должно быть меньше 45 символов'
    },
    'address': {
      'required': 'Введите имя улицы',
      'minlength': 'Имя должно быть больше 2 символов',
      'maxlength': 'Имя должно быть меньше 100 символов'
    },
    'number': {
      'required': 'Введите номер дома'
    },
    'liter': {
      'maxlength': 'Литера должна быть длиной 1 символ'
    },
    'lat': {
      'required': 'Поле обязательно'
    },
    'lng': {
      'required': 'Поле обязательно'
    },
    'image': {
      'required': 'Выберите изображение'
    }
  }

  constructor(private fb: FormBuilder, private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.setCurrentLocation()
  }

  createForm() {
    this.buildingForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      city: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      address: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      number: [null, [Validators.required]],
      liter: ["", Validators.maxLength(1)],
      lat: [this.center.lat, Validators.required],
      lng: [this.center.lng, Validators.required],
      image: [null, Validators.required]
    })
    this.buildingForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(this.center)
        this.createForm()
      });
    }
  }

  onValueChanged(data?: any) {
    if (!this.buildingForm) { return; }
    const form = this.buildingForm;
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

  markerDragEnd($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log($event);
    console.log($event.latLng.lat())
    this.center.lat = $event.latLng.lat()
    this.center.lng = $event.latLng.lng()
  }

  onSubmit() {
    this.buildingService.createBuilding(this.buildingForm.value).subscribe(res => {
      this.buildingService.postFile(this.buildingForm.value['image']).subscribe(res => {window.location.href="/info/buildings"}, err=> {
        this.errMess = err
      })
    }, 
      err=> this.errMess = err
    )
  }

}
