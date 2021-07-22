import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import * as tmImage from '@teachablemachine/image';

import { image } from '@tensorflow/tfjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  capturedSnapURL: string;
  classifyImage;
  url = 'https://teachablemachine.withgoogle.com/models/27MROsvng/';
  model;
  predictions = [];
  maxPredictions: any;
  flip = false;


  // cameraOptions: CameraOptions = {
  //   quality: 20,
  //   targetHeight: 500,
  //   targetWidth: 500,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }
  loading;
  croppedImagePath = '';
  drawImage: string;
  classPrediction: any;
  isImageSaved: boolean;
  item: any;
  message: string;

  constructor(private camera: Camera,
    private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public toastController: ToastController,
    private file: File) { }

  ngOnInit() {
    this.loadModel();
  }

  //LOAD THE MODEL
  async loadModel() {
    const modelURL = this.url + 'model.json';
    const metadataURL = this.url + 'metadata.json';

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    console.log(this.model.getClassLabels())
  }



  pickImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 300,
      targetHeight: 400,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then(async (imageData: any) => {
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      });
      loading.present();

      this.capturedSnapURL = 'data:image/jpeg;base64,' + imageData;
      const img = new Image();
      img.src = 'data:image/jpeg;base64,' + imageData;

      img.onload = () => {
        console.log('we loading');
        this.classifyImage = img;
        console.log('classify image for prediction', this.classifyImage);
        this.predict(this.classifyImage);
        loading.dismiss();
      }


    }, (err) => {
      // Handle error
    });
  }

  //CAMERA OR GALERY SELECTION
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.fileChangeEvent(0);
          console.log('model reaches', this.model);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async fileChangeEvent(e: any) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    loading.present();
    const width = 500;
    const height = 300;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        this.drawImage = ctx.canvas.toDataURL('image/jpeg');
        this.classifyImage = img;
        // console.log('test image for prediction', this.classifyImage);
        this.predict(this.classifyImage);
        loading.dismiss();
      },
        reader.onerror = error => {
          loading.dismiss();
          console.log(error);
        };
    };
    loading.dismiss();
  }



  async predict(image) {
    // predict can take in an image, video or canvas html element
    this.predictions = await this.model.predict(image);
    this.predictions = this.predictions.sort(function (a, b) {
      return b.probability - a.probability;
    });

    console.log('my predictions', this.predictions);
    // this.item = this.predictions[0];
    console.log('my item', this.item);


    if ((this.predictions[0].probability.toPrecision(3) * 100) < 90) {
      this.message = 'Take another picture';
    } else {
      this.item = this.predictions[0];
    }

  }

  async presentToast() {
    const toast = await this.toastController.create({

      message: 'Click to Close',
      position: 'bottom',
      duration: 5000

    });
    toast.present();
  }


}
