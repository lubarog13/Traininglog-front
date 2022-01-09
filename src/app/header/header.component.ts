import { Component, Input, OnInit } from '@angular/core';
import { faCalendarAlt, faBookOpen, faChartPie, faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import {MENUITEMS} from '../shared/nav_items';
import { flyInOut, slide, expand } from '../animations/app.animations';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';

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
  isMenuOpened=false
  auth = of(localStorage.getItem("id"))
  static showMenu = false
  public static isCollapsed: boolean = false
  public showBackdrop: boolean = false;
 
  public closeOnDocumentClick: boolean = true;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe(changes => this.isCollapsed=(changes[0].mqAlias=="xs" || changes[0].mqAlias=="sm"))
    HeaderComponent.showMenu = localStorage.getItem("id")!=undefined
    if(!HeaderComponent.showMenu) window.location.href="auth"
    console.log(this.isCollapsed)
  }

  closeBar (): void {
    this.showBackdrop = !this.showBackdrop
    console.log(this.showBackdrop)
  }

  openMenu(trigger) {
    if(!this.isMenuOpened){
      trigger.openMenu()
      this.isMenuOpened=true
      console.log("open")
    }
  }
  closeMenu(trigger) {
    if(this.isMenuOpened) {
      trigger.closeMenu()
      this.isMenuOpened=false
      console.log("close")
    }
  }

  static changeMenu(showMenu: boolean) {
    this.showMenu = showMenu
  }
  get staticChangeMenu() {
    return HeaderComponent.showMenu;
  }
}

