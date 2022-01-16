import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { UserService } from '../services/user.service';
import { Coach } from '../shared/models';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit, AfterViewInit {
  @ViewChild('gridList') gridList: MatGridList
  coaches: Coach[]
  errMess: string
  gridByBreakpoint = {
    xl: 6,
    lg: 5,
    md: 4,
    sm: 3,
    xs: 2
  } 

  constructor(private userService: UserService, @Inject('BaseURL') public BaseURL, private mediaObserver: MediaObserver ) { }

  ngAfterViewInit(): void {
    this.mediaObserver.asObservable().subscribe((change) => {
      console.log(this.gridList)
      this.gridList.cols = this.gridByBreakpoint[change[0].mqAlias]
    });
  }

  ngOnInit(): void {
    this.userService.getCoaches().subscribe(response=> this.coaches=response,err=> this.errMess=err)
  }

}
