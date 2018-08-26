import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFeature: string = 'recipe';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBu3e9m2nueDNg-UCw3nu7Hm1JH5wrwMws",
      authDomain: "testingapp-3fb7a.firebaseapp.com"
    })
  }

  featureValue(selectedData){
    this.selectedFeature = selectedData.value;
  }
}
