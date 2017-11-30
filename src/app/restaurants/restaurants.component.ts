import { Component, OnInit } from '@angular/core';
import {Restaurant} from './restaurant/restaurant.model';
import {RestaurantsService} from './restaurants.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';
  restaurants: Restaurant[]

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restauranteService: RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(searchTerm =>
           this.restauranteService.restaurants(searchTerm))
        .subscribe(restaurants => this.restaurants = restaurants);

    this.restauranteService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  search() {
    // this.searchBarState == 'hidden' ? 'visible' : 'hidden';
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
