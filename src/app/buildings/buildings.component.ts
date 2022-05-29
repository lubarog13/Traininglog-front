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
  loading = false
  center: google.maps.LatLngLiteral
  isAdmin = false
  time = new Date().getTime()

  constructor(private buildingService: BuildingService, @Inject('BaseURL') public BaseURL, private mediaObserver: MediaObserver, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.getBuildings()
      this.isAdmin = localStorage.getItem("username")==="admin";
    this.mediaObserver.asObservable().subscribe(changes => this.isVertical=!(changes[0].mqAlias=="xs" || changes[0].mqAlias=="sm"))
  }

  getBuildings() {
    this.loading = true
    this.buildingService.getBuildings().subscribe((response) => {
      this.buildings = response
      if(this.route.snapshot.queryParams['building_id']!=undefined) this.click(this.buildings.filter(building => building.id==Number.parseInt(this.route.snapshot.queryParams['building_id']))[0])
      else this.click(this.buildings[0])
      this.loading = false
    }, (err) => {
      this.errMess=err
      this.loading = false
    })
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

  getIsAdmin(): boolean {
    return localStorage.getItem("username")==='admin';
  }

}
