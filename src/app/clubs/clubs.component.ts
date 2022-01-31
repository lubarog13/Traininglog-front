import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormControl } from '@angular/forms';
import { MatGridList } from '@angular/material/grid-list';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { ClubsService } from '../services/clubs.service';
import { UserService } from '../services/user.service';
import { Building, Club, Coach, SignUp, User } from '../shared/models';

class Filter {
  by_coach: boolean
  value: string
  constructor(by_coach: boolean, value: string){
    this.by_coach= by_coach
    this.value = value
  }
}

class Check {
  value: string
  isSelected: boolean
  constructor(value: string, is_selected: boolean){
    this.value=value
    this.isSelected=is_selected
  }
}

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit, AfterViewInit {

  @ViewChild('gridList') gridList: MatGridList
  @ViewChild('gridTooList') gridTooList: MatGridList
  @ViewChild('gridTooTooList') gridTooTooList: MatGridList
  openAddForm = false
  gridByBreakpoint = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  } 
  myclubs: boolean
  filteredClubs: Club[]
  active = new FormControl(0)
  clubs: Club[]
  errMess: string
  filters: Filter[] = new Array<Filter>()
  coach_names: Check[]
  building_names: Check[]
  showFilterEdit = false
  sign_ups: SignUp[]
  is_coach: boolean
  usersForClubs: Map<number,User[]> = new Map

  constructor(private route: ActivatedRoute, private router: Router, private clubService: ClubsService, private mediaObserver: MediaObserver, private userService: UserService) { 
    
  }
  ngAfterViewInit(): void {
    this.mediaObserver.asObservable().subscribe((change) => {
      console.log(change)
      this.gridList.cols = this.gridByBreakpoint[change[0].mqAlias]
      if(!this.is_coach)
      this.gridTooList.cols=this.gridList.cols
      else
      this.gridTooTooList.cols = this.gridList.cols
    });
  }

  ngOnInit(): void {
    this.is_coach = localStorage.getItem("is_coach")=="true"
    this.route.queryParams.subscribe(params => {
      this.myclubs = (params.myclubs=="true")
      this.active.setValue(this.myclubs==true ? 1: 0)
      this.getClubs()
    }
    )
  }

  selectedChange() {
    console.log("nav1", this.myclubs)
      this.myclubs = this.myclubs===true? false: true
      console.log("nav", this.myclubs)
      this.router.navigate(
        ['.'],
        {
          relativeTo: this.route,
          queryParams: { myclubs : this.myclubs}
        }
      )
  }

  getClubs() {
    if(!this.myclubs)
    this.clubService.getClubs().subscribe(clubs => {
      this.clubs=clubs
      this.filteredClubs = this.clubs
      var c_names = new Array<string>()
      var b_names = new Array<string>()
      for(let club of clubs) {
        var coach = club.coach.user.last_name + " " +club.coach.user.first_name.charAt(0) + ". " + club.coach.user.second_name.charAt(0)+"."
        if(!c_names.includes(coach)){
            c_names.push(coach)
        }
        var building = club.building.name
        if(!b_names.includes(building)){
          b_names.push(building)
        }
      }
      this.coach_names = c_names.map(name=> new Check(name, false))
      this.building_names = b_names.map(name => new Check(name, false))
      console.log(c_names)
    }, err=> this.errMess=err)
    else if (!this.is_coach){
    this.clubService.getSignUpsForUser(Number.parseInt(localStorage.getItem("id"))).subscribe(response=> {
      this.sign_ups = response.Sign_Ups
      for(let signup of this.sign_ups){
        signup.end_time=new Date(signup.end_date)
      }
      console.log("signups", this.sign_ups)
    }, err => this.errMess=err
    )
  }
  else {
    this.clubService.getClubsForCoach(Number.parseInt(localStorage.getItem("coach_id"))).subscribe(response => {
      this.clubs = response.Clubs
    })
  }
  }

  onChanged(ev: EventTarget) {
    var value = (ev as HTMLTextAreaElement).value
    if(value.length==0) {
      this.filteredClubs=this.clubs
    }
    else this.filteredClubs = this.clubs.filter((club) => (club.name.includes(value) || club.group.includes(value) || (club.coach.user.last_name + " " + club.coach.user.first_name+ " " + club.coach.user.second_name).includes(value) || (club.coach.user.first_name + " " + club.coach.user.last_name).includes(value)))
  }

  setFilters() {
    var coach_names = this.coach_names.filter(name => name.isSelected)
    var building_names = this.building_names.filter(name=> name.isSelected)
    console.log(coach_names.map(name => new Filter(true, name.value)))
    this.filters = []
    this.filters.push.apply(this.filters, coach_names.map(name => new Filter(true, name.value)))
    this.filters.push.apply(this.filters,  building_names.map(name => new Filter(false, name.value)))
    this.updateFilters()
  }

  updateFilters() {
    this.filteredClubs = []
    console.log(this.filters)
    for(let filter of this.filters) {
      if(filter.by_coach){
        this.filteredClubs.push.apply(this.filteredClubs, this.clubs.filter(club => (club.coach.user.last_name + " " +club.coach.user.first_name.charAt(0) + ". " + club.coach.user.second_name.charAt(0)+".")===filter.value))
      } 
    }
    var filteredClubs= this.filteredClubs.length==0? this.clubs: this.filteredClubs
    this.filteredClubs = []
    for(let filter of this.filters){
      if(!filter.by_coach){
        this.filteredClubs.push.apply(this.filteredClubs, filteredClubs.filter(club => club.building.name===filter.value))
      }
    }
    if(this.filters.filter(filter => !filter.by_coach).length==0) {
      this.filteredClubs=filteredClubs
    }
    this.showFilterEdit=false
  }

  remove(filter: Filter) {
    const index = this.filters.indexOf(filter)
    if(index>=0){
      this.filters.splice(index, 1)
    }
    if(filter.by_coach){
      this.coach_names.filter(name => name.value==filter.value)[0].isSelected=false
    } else {
     this.building_names.filter(name => name.value==filter.value)[0].isSelected=false
    }
    this.updateFilters()
  }

  getUsersForClub(club: number) {
    if(!this.usersForClubs.has(club))
    this.userService.getUsersForClub(club).subscribe(response => {
      this.usersForClubs.set(club, response.Users)
    })
    else this.usersForClubs.delete(club)
  }

  deleteSignup(signup_id: number){
    this.clubService.deleteSignup(signup_id).subscribe(response => {
      this.sign_ups = this.sign_ups.filter(signup=> signup.id!=signup_id)
    }, err=> {
      
    })
  }

}
