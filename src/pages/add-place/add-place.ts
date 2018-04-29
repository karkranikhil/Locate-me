import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import {NgForm} from '@angular/forms'
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location"
@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location:Location ={
      lat:-37.82054,
      lng:144.94130110000003
  }
  constructor(private modalCtrl: ModalController) {}
  onSubmit(form:NgForm){
    console.log(form.value)
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AddPlacePage');
  // }
  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {location:this.location})
    modal.present();
  }

}
