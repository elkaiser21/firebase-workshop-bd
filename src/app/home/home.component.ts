import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ageValue = 0;
  searchValue = '';
  items: Array<any>;
  ageFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
      this.ageFilteredItems = result;
      this.nameFilteredItems = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.nameFilteredItems = result;
      this.items = this.combineLists(result, this.ageFilteredItems);
    });
  }

  rangeChange(event) {
    this.firebaseService.searchUsersByAge(event.value)
    .subscribe(result => {
      this.ageFilteredItems = result;
      this.items = this.combineLists(result, this.nameFilteredItems);
    });
  }

  combineLists(a, b) {
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

}