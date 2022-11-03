import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../snackBars/notify/notify.component';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }

  successfulNotification(text : string){
    this.snackBar.openFromComponent(NotifyComponent,{
      duration: 1500,
      panelClass:['green-stackbar'],
      data: {
        text: text
      }
    })
}
}
