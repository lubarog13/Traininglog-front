import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BuildingsComponent } from '../buildings/buildings.component';
import { BuildingService } from '../services/building.service';
import { Building, Hall } from '../shared/models';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss']
})
export class HallsComponent implements OnInit {

  
  halls: Hall[]
  searchedHalls: Hall[]
  data: Map<Building, Hall[]> = new Map<Building, Hall[]>()
  errMsg: string
  selectedHall: Hall
  isVertical=true
  center: google.maps.LatLngLiteral
  hall_id = 0

  constructor(private buildingService: BuildingService, @Inject('BaseURL') public BaseURL, private mediaObserver: MediaObserver, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params.hall_id!=undefined){
      this.hall_id = Number.parseInt(params.hall_id)
      }
    this.buildingService.getHalls().subscribe((responce) => {
      this.halls=responce
      this.click(this.halls[0])
      var buildings = this.halls.map(hall => hall.building)
      buildings = buildings.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id
      )))
      for(let building of buildings) {
        this.data.set(building, this.halls.filter(hall => hall.building.id==building.id))
      }
      if(this.hall_id!=0) this.selectedHall = this.halls.filter(hall=> hall.id==this.hall_id)[0]
      console.log(this.selectedHall)
    },(err) => this.errMsg=err )
  })
    this.mediaObserver.asObservable().subscribe(changes => this.isVertical=!(changes[0].mqAlias=="xs" || changes[0].mqAlias=="sm"))
  }


  click(hall: Hall) {
    this.selectedHall=hall
    this.center = {
      lat: hall.building.lat,
      lng: hall.building.lng
    }
  }

  onChanged(ev: EventTarget) {
    var value = (ev as HTMLTextAreaElement).value
    if(value.length==0){
      this.searchedHalls=undefined
    }
    else this.searchedHalls = this.halls.filter((hall) => hall.name.includes(value) || hall.number.toString().includes(value))
  } 

}
