import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private buildingService: BuildingService, @Inject('BaseURL') public BaseURL, private mediaObserver: MediaObserver, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.getBuildings()
    this.mediaObserver.asObservable().subscribe(changes => this.isVertical=!(changes[0].mqAlias=="xs" || changes[0].mqAlias=="sm"))
  }

  getBuildings() {
    this.buildingService.getBuildings().subscribe((response) => {
      this.buildings = response
      console.log(response)
      if(this.route.snapshot.queryParams['building_id']!=undefined) this.click(this.buildings.filter(building => building.id==Number.parseInt(this.route.snapshot.queryParams['building_id']))[0])
      else this.click(this.buildings[0])
      console.log(this.selectedBuilding)
    }, (err) => this.errMess=err)
  }

  click(building: Building) {
      this.selectedBuilding = building
      this.center = {
        lat: building.lat,
        lng: building.lng
      }
  }

  markerDragEnd($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log($event);
    console.log($event.latLng.lat())
  }

}
