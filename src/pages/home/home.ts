import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ApiService } from './api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService]
})
export class HomePage implements OnInit {

  todos: any = []
  tpmTodos: any = []
  searchTerm: string = ''
  searchControl: FormControl
  errorMsg: any
  searching: any = false

  constructor(public navCtrl: NavController, private apiService: ApiService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.getTodoList()
  }

  ionViewDidLoad() {
    this.setFilteredItems()
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false
      this.setFilteredItems()
    });
  }

  onSearchInput() {
    this.searching = true
  }

  getTodoList() {
    this.apiService.list().subscribe(
      res => {
        this.todos = res
        this.tpmTodos = this.todos
      },
      error => this.errorMsg = error
    )
  }

  filterItems(searchTerm) {
    this.tpmTodos = this.todos
    if(searchTerm == '') {
      return this.todos
    }
    return this.tpmTodos.filter((item) => {
      return item.userId == searchTerm;
    });
  }

  setFilteredItems() {
    this.tpmTodos = this.filterItems(this.searchTerm);
  }

}
