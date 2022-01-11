import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BuildingService } from '../services/building.service';
import { Building } from '../shared/models';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {

  buildings: Building[]
  errMess: string;
  selectedBuilding: Building
  isVertical=true
  center: google.maps.LatLngLiteral

  constructor(private buildingService: BuildingService, @Inject('BaseURL') public BaseURL, private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe((response) => {
      this.buildings = response
      this.click(this.buildings[0])
      console.log(this.buildings)
    }, (err) => this.errMess=err)
    this.mediaObserver.asObservable().subscribe(changes => this.isVertical=!(changes[0].mqAlias=="xs" || changes[0].mqAlias=="sm"))
  }

  click(building: Building) {
      this.selectedBuilding = building
      this.center = {
        lat: building.lat,
        lng: building.lng
      }
  }

}
