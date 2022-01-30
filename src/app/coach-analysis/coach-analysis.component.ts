import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IgxPieChartComponent } from 'igniteui-angular-charts';
import { ClubsService } from '../services/clubs.service';
import { UserService } from '../services/user.service';
import { Club, GroupAnalysisItem, Month, TypesAnalysis } from '../shared/models';

@Component({
  selector: 'app-coach-analysis',
  templateUrl: './coach-analysis.component.html',
  styleUrls: ['./coach-analysis.component.scss']
})
export class CoachAnalysisComponent implements OnInit {
  active = new FormControl(0)
  public data: any;
  @ViewChild("chart", { static: true })
    public chart: IgxPieChartComponent;
    total: number;
    forTypes: TypesAnalysis
    public data2: any[];
    public data3: any[];
    months = ["Всего", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    selected= this.months[0]
    week_days = ["Всего", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    selectedDay = this.week_days[0]
    workout_counts: GroupAnalysisItem[]
    presence_counts: GroupAnalysisItem[]
    presence_count: GroupAnalysisItem[]
    clubs: Club[]
    clubAnalysis: TypesAnalysis[]

    constructor(private userService: UserService, private clubService: ClubsService) {
    }

  ngOnInit(): void {
      this.getMonthAnalysis()
      this.getGroupStat()
      this.clubService.getClubsForCoach(Number.parseInt(localStorage.getItem("coach_id"))).subscribe(response =>{
        this.clubs = response.Clubs
      })
/*       this.data2 = [
        {Group: 'девочки 2007-2008', Количество: 0.3},
        {Group: 'девочки 2007-2008', Количество: 0},
        {Group: 'девочки 2007-2008', Количество: 0.9},
        {Group: 'девочки 2007-2008', Количество: 0},
        {Group: 'девочки 2009-2010 г.р.', Количество: 0.5},
        {Group: 'Девочки 2008-2009', Количество: 0.27}
    ]; */
  }

  getGroupStat() {
    var index = this.months.indexOf(this.selected)==0? "all" : this.months.indexOf(this.selected).toString();
    this.userService.getWorkoutCountForMonth(new Month(index)).subscribe(resonse => {
      this.workout_counts = resonse.Stat
      this.userService.getPresenceCountForMonth(new Month(index)).subscribe(response => {
        this.presence_counts = response.Stat
        this.data2 = []
        for (let workout of this.workout_counts) {
          let count = 0
          for (let presence of this.presence_counts) {
            if(presence.workout__club__group==workout.club__group) {
              count = presence.pcount / workout.wcount
              break
            }
          }
          this.data2.push({Group: workout.club__group, Количество: Number.parseFloat(count.toFixed(2))})
        }
        console.log(this.data2)
      })
    }
      , err=> console.log(err))
  }

  getMonthAnalysis() {
    var index = this.months.indexOf(this.selected);
    console.log(index)
    if(index==0) {
      this.userService.getAnalysisForTypes().subscribe(response => {
        this.total = response.Cardio+response.Strength+response.For_tech+response.For_all+response.Another
        this.forTypes=response
        this.data = [
          { Value: response.Cardio, Label: "Кардио " + (response.Cardio / this.total * 100).toFixed(2)+ "%"},
          { Value: response.Strength, Label: "Силовая " + (response.Strength/ this.total* 100).toFixed(2) + "%"},
          { Value: response.For_tech, Label: "На технику " + (response.For_tech/ this.total* 100).toFixed(2) + "%"},
          { Value: response.For_all, Label: "Общая " + (response.For_all/ this.total* 100).toFixed(2) + "%"},
          { Value: response.Another, Label: "Другое " + (response.Another/ this.total* 100).toFixed(2) + "%"}
        ];
    }, err=> console.log(err))
  }
    else{
      this.userService.getAnalysisForMonth(index).subscribe(response=> {
          this.total = response.Cardio+response.Strength+response.For_tech+response.For_all+response.Another
          this.forTypes=response
          this.data = [
            { Value: response.Cardio, Label: "Кардио " + (response.Cardio / this.total * 100).toFixed(2)+ "%"},
            { Value: response.Strength, Label: "Силовая " + (response.Strength/ this.total* 100).toFixed(2) + "%"},
            { Value: response.For_tech, Label: "На технику " + (response.For_tech/ this.total* 100).toFixed(2) + "%"},
            { Value: response.For_all, Label: "Общая " + (response.For_all/ this.total* 100).toFixed(2) + "%"},
            { Value: response.Another, Label: "Другое " + (response.Another/ this.total* 100).toFixed(2) + "%"}
          ];
      })
    }
  }

  getClubsAnalysis() {
    var index = this.week_days.indexOf(this.selectedDay);
    var day: Month;
    if (index==0) {
      day =new Month("all")
    } else if (index==7) day= new Month("1")
    else {
      day = new Month((index+1).toString())
    }
    this.userService.getPresenceCountForGroups(day).subscribe(response => {
      this.presence_count = response.Stat
      this.data3=[]
      this.clubAnalysis = []
      for (let presence of this.presence_count) {
        this.data3.push({Group: this.clubs.filter( club => club.id== presence.workout__club__id)[0].group, Количество: presence.pcount})
        this.getClubStat(presence.workout__club__id)
      }
      console.log(this.data3)
    })
  }

  getClubStat(club_id: number) {
    this.clubService.getClubAnalysis(club_id).subscribe(response=> {
      response.club = this.clubs.filter( club => club.id== club_id)[0].group
      this.clubAnalysis.push(response)}
      )
  }

  public pieSliceClickEvent(e: any): void {
    e.args.isExploded = !e.args.isExploded;
}

public ngAfterViewInit(): void {
    this.chart.explodedSlices.add(3);
}

selectedChange() {
  if(this.active.value==0) {
    this.getMonthAnalysis()
      this.getGroupStat()
  }
  else if (this.active.value==1) {
    this.getClubsAnalysis()
  }
}

}
