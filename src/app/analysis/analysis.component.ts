import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxPieChartComponent } from 'igniteui-angular-charts';
import { UserService } from '../services/user.service';
import { TypesAnalysis } from '../shared/models';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  public data: any;
  @ViewChild("chart", { static: true })
    public chart: IgxPieChartComponent;
    total: number;
    forTypes: TypesAnalysis
    public data2: any[];

    constructor(private userService: UserService) {
    }

  ngOnInit(): void {
    this.userService.getAnalysisForTypes().subscribe(response => {
      this.total = response.Cardio+response.Strength+response.For_tech+response.For_all+response.Another
      this.forTypes=response
      this.data = [
        { Value: response.Cardio, Label: "Кардио " + response.Cardio / this.total * 100+ "%"},
        { Value: response.Strength, Label: "Силовая " + response.Strength/ this.total* 100 + "%"},
        { Value: response.For_tech, Label: "На технику " + response.For_tech/ this.total* 100 + "%"},
        { Value: response.For_all, Label: "Общая " + response.For_all/ this.total* 100 + "%"},
        { Value: response.Another, Label: "Другое " + response.Another/ this.total* 100 + "%"}
      ];
    })
    this.userService.getAnalysisForMonths().subscribe(response => {
      this.userService.getNotAttendCOuntForMonths().subscribe(response1 => {
        this.data2 = [
          { Month: "Январь", Присутствий: response.jan, Отсутствий: response1.jan},
          { Month: "Февраль", Присутствий: response.feb, Отсутствий: response1.feb},
          { Month: "Март", Присутствий: response.mar, Отсутствий: response1.mar},
          { Month: "Апрель", Присутствий: response.apr, Отсутствий: response1.apr},
          { Month: "Май", Присутствий: response.may, Отсутствий: response1.may},
          { Month: "Июнь", Присутствий: response.jun, Отсутствий: response1.jun},
          { Month: "Июль", Присутствий: response.jul, Отсутствий: response1.jul},
          { Month: "Август", Присутствий: response.aug, Отсутствий: response1.aug},
          { Month: "Сентябрь", Присутствий: response.sep, Отсутствий: response1.sep},
          { Month: "Октябрь", Присутствий: response.oct, Отсутствий: response1.oct},
          { Month: "Ноябрь", Присутствий: response.nov, Отсутствий: response1.nov},
          { Month: "Декабрь", Count: response.dec, Отсутствий: response1.dec}
        ];
      })
    }
    )
  }

  public pieSliceClickEvent(e: any): void {
    e.args.isExploded = !e.args.isExploded;
}

public ngAfterViewInit(): void {
    this.chart.explodedSlices.add(3);
}

}
