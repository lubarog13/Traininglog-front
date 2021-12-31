import { Component, Input, OnInit } from '@angular/core';
import { faCalendarAlt, faBookOpen, faChartPie, faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import {MENUITEMS} from '../shared/nav_items';
import { flyInOut, slide, expand } from '../animations/app.animations';

type PaneType = 'left' | 'right';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
   animations: [
     flyInOut(),
     slide(),
     expand()
   ] 
})

export class HeaderComponent implements OnInit {
  @Input() activePane: PaneType = 'right';
  menuitems = MENUITEMS
  faBars=faBars
  faUserCircle = faUserCircle
  isCollapsed = false
  public static isCollapsed: boolean = false
  public showBackdrop: boolean = false;
 
  public closeOnDocumentClick: boolean = true;

  constructor() { }

  ngOnInit(): void {
    HeaderComponent.isCollapsed = window.innerWidth<500
    this.isCollapsed = HeaderComponent.isCollapsed
    console.log(this.isCollapsed)
  }

  closeBar (): void {
    this.showBackdrop = !this.showBackdrop
    console.log(this.showBackdrop)
  }

}
