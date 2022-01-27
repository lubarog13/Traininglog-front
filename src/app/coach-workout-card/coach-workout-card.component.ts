import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SimplePresence, Workout } from '../shared/models';
import { faEdit, faWindowClose, faQuestionCircle, faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { PresenceService } from '../services/presence.service';
import { expand } from '../animations/app.animations';

@Component({
  selector: 'app-coach-workout-card',
  template: `
    <mat-card appMaterialElevation [@expand]>
                        <mat-card-header>
                        <mat-card-title>
                            {{workout.club.name}}
                        </mat-card-title>
                        <div class="on_train"> {{workout.on_train}}</div>
                        <div class="dont_know"> {{workout.dont_know}} </div>
                        <div class="not_on_train">
                        {{workout.not_on_train}} </div>
                        <div class="right_column" style="width: 100%;">
                        {{workout.start_date.getUTCHours()}}:{{(workout.start_date.getMinutes()<10?'0':'') + workout.start_date.getMinutes()}}</div>
                        </mat-card-header>
                        <mat-divider [ngStyle]="{'background-color': workout.color}" style="height: 3px;"></mat-divider>
                        <mat-card-content>
                            <br>
                            <div>Время: <span class="right_column"> {{workout.start_date.toLocaleDateString()}} {{workout.start_date.getUTCHours()}}:{{(workout.start_date.getMinutes()<10?'0':'') + workout.start_date.getMinutes()}}-{{workout.end_date.getUTCHours()}}:{{(workout.end_date.getMinutes()<10?'0':'') + workout.end_date.getMinutes()}}</span></div>
                            <div>Группа: <span class="right_column"> {{workout.club.group}}</span></div>
                            <div>Зал: <a [routerLink]="['/info/halls']" [queryParams]="{hall_id: workout.hall.id}" class="right_column"> {{workout.hall.name}}, {{workout.hall.number}}</a></div>
                            <div>Тренер: <span class="right_column"> {{ workout.coach_replace!=undefined? workout.coach_replace.user.last_name + " "
                                 + workout.coach_replace.user.first_name.charAt(0) + ". " + workout.coach_replace.user.second_name.charAt(0)+ "."
                                 : workout.club.coach.user.last_name + " " + workout.club.coach.user.first_name.charAt(0) + ". " 
                                 + workout.club.coach.user.second_name.charAt(0)+ "."}}</span></div>
                             <div>Тип: <span class="right_column"> {{workout.type!="другое"? workout.type: workout.other_type}}</span></div>
                             <div *ngIf="(whoDontKnow!=undefined || whoGoes!=undefined || whoNotGoes!=undefined)">
                            <mat-divider></mat-divider>
                             <div fxLayout="row" align="center" class="whoGoes" style="width: 100%;">
                                 <div fxFlex="33">
                                    <fa-icon [icon]="faThumbsUp" style="color: green; align-content: center;"></fa-icon>
                                     <p *ngFor="let presence of whoGoes" align="left">
                                         {{presence.user.last_name + " "+ presence.user.first_name.charAt(0) + ". " + presence.user.second_name.charAt(0) + "."}}
                                     </p>
                                 </div>
                                 <div fxFlex="33">
                                    <fa-icon [icon]="faQuestionCircle" style="color: grey;"></fa-icon>
                                    <p *ngFor="let presence of whoDontKnow" align="left">
                                        {{presence.user.last_name + " "+ presence.user.first_name.charAt(0) + ". " + presence.user.second_name.charAt(0) + "."}}
                                    </p>
                                </div>
                                 <div fxFlex="33">
                                    <fa-icon [icon]="faTimesCircle" style="color: red;"></fa-icon>
                                    <p *ngFor="let presence of whoNotGoes" align="left">
                                        {{presence.user.last_name + " "+ presence.user.first_name.charAt(0) + ". " + presence.user.second_name.charAt(0) + "."}}
                                    </p>
                                </div>
                             </div>
                             </div>
                        </mat-card-content>
                        <mat-card-footer style="display: flex;">
                            <button mat-button class="button-ok" style="font-size: 11px" (click)="edit.emit('edit')" [disabled]="canEdit">
                                <fa-icon [icon]="faEdit" ></fa-icon>
                              Редактировать
                            </button>
                            <button mat-button class="button-no" [disabled]="canEdit">
                                <fa-icon [icon]="faWindowClose"></fa-icon>
                                Отменить
                            </button>
                            <button mat-button class="button-who-goes"  (click)="getPresences(workout.id)">
                                <fa-icon [icon]="faQuestionCircle"></fa-icon>
                                Кто идет?
                            </button>
                        </mat-card-footer>
                    </mat-card>
  `,
  styleUrls: ['../schedule/schedule.component.scss'],
  animations: [
    expand()
  ]
})
export class CoachWorkoutCardComponent implements OnInit {

  @Input("workout") workout: Workout
  @Output() edit = new EventEmitter()
  whoGoes: SimplePresence[]
  whoNotGoes: SimplePresence[]
  whoDontKnow: SimplePresence[]
  canEdit = true
  faEdit = faEdit
  faWindowClose = faWindowClose
  faQuestionCircle = faQuestionCircle
  faThumbsUp = faThumbsUp
  faTimesCircle = faTimesCircle

  constructor(private presenceService: PresenceService) { }

  ngOnInit(): void {
    this.canEdit = this.workout.start_date < new Date()
  }

  getPresences(id: number): void {
    if(this.whoGoes==undefined || this.whoNotGoes==undefined || this.whoDontKnow==undefined){
      this.presenceService.getPresencesForWorkout(id).subscribe((response)=> {
        this.whoGoes = response.Presences.filter((presence) => presence.is_attend==true)
        this.whoNotGoes = response.Presences.filter((presence) => presence.is_attend==false)
        this.whoDontKnow = response.Presences.filter((presence) => presence.is_attend==null)
      })
    } else {
      this.whoGoes=undefined
      this.whoNotGoes=undefined
      this.whoDontKnow=undefined
    }
  }

}
