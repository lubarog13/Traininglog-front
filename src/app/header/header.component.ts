import { Component, OnInit } from '@angular/core';
import { faCalendarAlt, faBookOpen, faChartPie, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {MENUITEMS} from '../shared/nav_items';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  menuitems = MENUITEMS
  faUserCircle = faUserCircle
  isCollapsed = false
  public static isCollapsed: boolean = false
  public showBackdrop: boolean = true;
 
  public closeOnDocumentClick: boolean = true;

  constructor() { }

  ngOnInit(): void {
    HeaderComponent.isCollapsed = window.innerWidth<500
    this.isCollapsed = HeaderComponent.isCollapsed
    console.log(this.isCollapsed)
  }

}
