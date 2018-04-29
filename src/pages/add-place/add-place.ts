import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms'
@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  onSubmit(form:NgForm){
    console.log(form.value)
  }
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AddPlacePage');
  // }

}
