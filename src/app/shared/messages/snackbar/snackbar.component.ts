import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NotificationService} from '../notification.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({opacity: 0, bottom: '0px'})),
      state('visible', style({opacity: 1, bottom: '30px'})),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message = 'Hello there!';

  snackVisibility = 'hidden';

  constructor(private noficiationService: NotificationService) { }

  ngOnInit() {
    this.noficiationService.notifier.do(message => {
        this.message = message
        this.snackVisibility = 'visiable'
      }).switchMap(message => Observable.timer(3000))
        .subscribe(timer => this.snackVisibility = 'hidden');
  }

}
