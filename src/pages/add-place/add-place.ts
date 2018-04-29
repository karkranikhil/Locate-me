import { Component } from '@angular/core';
import {IonicPage, ModalController, LoadingController, ToastController} from 'ionic-angular';
import {NgForm} from '@angular/forms'
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location"
import {PlacesService} from "../../services/places"

declare var cordova:any;
@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location:Location ={
      lat:-37.82054,
      lng:144.94130110000003
  };
  locationIsSet = false;
  imageUrl=''
  constructor(private modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              private toastCtrl:ToastController,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
  private placesService: PlacesService) {}
  onSubmit(form:NgForm){
    console.log(form.value)
      this.placesService.addPlace(form.value.title,form.value.description,this.location, this.imageUrl);
      form.reset();
      this.location={
          lat:-37.82054,
          lng:144.94130110000003
      };
      this.imageUrl='';
      this.locationIsSet=false;

  }
  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {location:this.location, isSet:this.locationIsSet})
    modal.present();
    modal.onDidDismiss(
        data=>{
            if(data){
                this.location = data.location;
                this.locationIsSet = true;
            }
        }
    )
  }
    onLocate(){
        let loader = this.loadingCtrl.create({
            content: 'Getting your location...'
        });
        loader.present();
        this.geolocation.getCurrentPosition().then(location => {
            loader.dismiss();
            this.location.lat = location.coords.latitude;
            this.location.lng = location.coords.longitude;
            this.locationIsSet = true;
         },(error)=>{
            loader.dismiss();
            const toast = this.toastCtrl.create({
                message:"Couldn't get location, please pick it manually!",
                duration:2500
            });
            toast.present();
        });
    }

    onTakePhoto(){
        this.camera.getPicture({
            encodingType:this.camera.EncodingType.JPEG,
            correctOrientation:true
        }).then((imageData) => {
            const currentName=imageData.replace(/^.*[\\\/]/, '');
            const path = imageData.replace(/[^\/]*$/, '');
            const newFileName = new Date().getUTCMilliseconds + '.jpg';
            this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName).then((data)=>{
                this.imageUrl= data.nativeURL;
                this.camera.cleanup();
                //this.file.removeFile(path,currentName)
            },(error)=>{
                this.imageUrl='';
                let toast = this.toastCtrl.create({
                    message:'Could not save the image. Please try again',
                    duration:2500
                });
                toast.present();
                this.camera.cleanup()
            })
            this.imageUrl=imageData;
            //let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (error) => {
            this.imageUrl='';
            let toast = this.toastCtrl.create({
                message:'Could not take the image. Please try again',
                duration:2500
            });
            toast.present();
            this.camera.cleanup()
        });
    }

}
