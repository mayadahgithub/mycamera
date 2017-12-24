import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {enviroment } from '../../enviroments/enviroment';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-myphoto',
  templateUrl: 'myphoto.html',
})
export class MyphotoPage {
mySelectedphoto;
 loading;
currentphoto;
imgSource;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public camera:Camera,public loadingCtrl:LoadingController) {
firebase.initializeApp(enviroment.firebase);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyphotoPage');
  }


  takephoto(){
   const options: CameraOptions ={
   quality: 100,
   targetHeight:200,
   targetWidth:200,
   destinationType: this.camera.DestinationType.DATA_URL,
   encodingType: this.camera.EncodingType.JPEG,
   mediaType:this.camera.MediaType.PICTURE
   }
   this.camera.getPicture(options).then((ImageData) =>{
     this.loading = this.loadingCtrl.create({
       content:"Taking photo wait ..."
     });
     this.loading.present();
     this.mySelectedphoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);////
     this.upload();
   },(err)=>{
     console.log(err);
   });
  }

   dataURLtoBlob(myURL){
    let binary =atob(myURL.split(',')[1]);
    let array = [];
    for(let i =0 ; i< binary.length;i++){
   array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
   }
  
   upload(){
     if(this.mySelectedphoto){
      var uploadTask = firebase.storage().ref().child('images/myphoto.jpg').put(this.mySelectedphoto);
      uploadTask.then(this.onSuccess,this.onErrors);
     }
   }
   onSuccess=(snapshot)=>{
  this.currentphoto = snapshot.downloadURL;
  this.loading.dismiss();
   }

   onErrors(error){
   console.log(error);
   this.loading.dismiss();
   }

   getMyURL(){
     firebase.storage().ref().child('images/myphoto.jpg').getDownloadURL().then((url)=>{
       this.imgSource = url;
     })
   }



}

