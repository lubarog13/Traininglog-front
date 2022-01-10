import { Component, Input, OnInit } from '@angular/core';
import { faCalendarAlt, faBookOpen, faChartPie, faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import {MENUITEMS} from './shared/nav_items';
import { flyInOut, slide, expand } from './animations/app.animations';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';

type PaneType = 'left' | 'right';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    flyInOut(),
    slide(),
    expand()
  ] 
})
export class AppComponent {
  @Input() activePane: PaneType = 'right';
  menuitems = MENUITEMS
  title  = 'training-log'
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
    AppComponent.showMenu = localStorage.getItem("id")!=undefined
    if(!AppComponent.showMenu) window.location.href="auth"
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
    return AppComponent.showMenu;
  } 

  goToHref(href: string) {
    window.location.href = href
  }
}
