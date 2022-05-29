import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from '../services/building.service';
import { Building } from '../shared/models';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.scss']
})
export class EditBuildingComponent implements OnInit {

  buildingForm: FormGroup
  building: Building
  id: number
  center: google.maps.LatLngLiteral
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
  time = new Date().getTime()

  validationMessages = {
    'name': {
      'required': 'Введите название здание',
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
    }
  }

  constructor(private fb: FormBuilder, private buildingService: BuildingService, private route: ActivatedRoute, @Inject('BaseURL') public BaseURL, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = (params.id)
      this.buildingService.getBuilding(this.id).subscribe(res => {
        this.building = res
        this.setCurrentLocation()
      })
    })
  }

  createForm() {
    console.log(this.building.name)
    this.buildingForm = this.fb.group({
      name: [this.building.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      city: [this.building.city, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      address: [this.building.address, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      number: [this.building.number, [Validators.required]],
      liter: [this.building.liter, Validators.maxLength(1)],
      lat: [this.building.lat, Validators.required],
      lng: [this.building.lng, Validators.required],
      image: [null]
    })
    this.buildingForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged()
  }

  private setCurrentLocation() {
        this.center = {
          lat: this.building.lat,
          lng: this.building.lng
        }
        this.createForm()
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
    this.buildingService.updateBuilding(this.id, this.buildingForm.value).subscribe(res => {
      if (this.buildingForm.value['image']!=null){
      this.buildingService.postFile(this.buildingForm.value['image'], this.building.id).subscribe(res => {this.router.navigate(["/info/buildings"])}, err=> {
        console.log(err)
      })
    } else {
      this.router.navigate(["/info/buildings"])
    }
    }, err=> console.log(err))
  }

}
