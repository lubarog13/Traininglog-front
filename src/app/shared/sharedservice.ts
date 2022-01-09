import { Observable, Observer } from "rxjs";
import { User } from "./models";

export class SharedService {
    globalVar:User;
    globalVarUpdate:Observable<User>;
    globalVarObserver:Observer<User>
  
    constructor() {
      this.globalVarUpdate = Observable.create((observer:Observer<User>) => {
        this.globalVarObserver = observer;
      });
    }
  
    updateGlobalVar(newValue:User) {
      this.globalVar = newValue;
      this.globalVarObserver.next(this.globalVar);
  }
}