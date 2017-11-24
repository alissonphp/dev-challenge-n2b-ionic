import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from './api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService]
})
export class HomePage implements OnInit {

  todos: any = []

  errorMsg: any

  constructor(public navCtrl: NavController, private apiService: ApiService) {}

  ngOnInit() {
    this.getTodoList()
  }

  getTodoList() {
    this.apiService.list().subscribe(
      res => this.todos = res,
      error => this.errorMsg = error
    )
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.getTodoList();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      console.log(val)
      this.todos = this.todos.filter(
        item => item.userId == val
      )
    }
  }

}
