import { Component, Input, OnInit } from '@angular/core';
import { faSignOutAlt, faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import {MENUITEMS, PROFILEITMS} from './shared/nav_items';
import { flyInOut, slide, expand } from './animations/app.animations';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';

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
  profileitems = PROFILEITMS
  name: string
  surname: string
  title  = 'training-log'
  faBars=faBars
  faUserCircle = faUserCircle
  faSignOutAlt = faSignOutAlt
  isCollapsed = false
  isMenuOpened=false
  timedOutCloser
  auth = of(localStorage.getItem("id"))
  static showMenu = false
  public static isCollapsed: boolean = false
  public showBackdrop: boolean = false;
 
  public closeOnDocumentClick: boolean = true;

  constructor(private mediaObserver: MediaObserver, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe(changes => this.isCollapsed=(changes[0].mqAlias=="xs" || changes[0].mqAlias=="sm"))
    this.name = localStorage.getItem("first_name")
    this.surname = localStorage.getItem("last_name")
    AppComponent.showMenu = localStorage.getItem("id")!=undefined
    if(!AppComponent.showMenu && window.location.href!=="http://localhost:4200/auth") window.location.href="auth"
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

  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      console.log(this.isMenuOpened)
      this.mouseOnMenu(trigger)
    }, 1000);
  }

  mouseOnMenu(trigger) {
    if (this.isMenuOpened) {
      this.timedOutCloser = setTimeout(() => {this.mouseOnMenu(trigger)}, 1000)
    }
    else trigger.closeMenu();
  }

  logout() {
    this.authService.logout().subscribe(response => {
      this.clearLocalStorage()
      this.goToHref("/auth")
    })
  }

  openLogoutDialog() {
    let dialogRef = this.dialog.open(AnswerDialogComponent, {data: { title: "Подтверждение", message: "Вы действительно хотите выйти из системы?"}})
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true) this.logout()
    });
  }

  clearLocalStorage() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("first_name")
    localStorage.removeItem("last_name")
    localStorage.removeItem("id")
  }
  
}
