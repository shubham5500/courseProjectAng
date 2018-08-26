import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthService{
    token: firebase.Promise<any>;
    constructor(private router: Router){

    }
    signUpUser(email: string, password: string){
        //firebase.auth() is a default method of firebase package..        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((credentials)=>{
            console.log(credentials);   
            this.router.navigate(['/signin'])
        }).catch(
            (error)=>console.log(error)
        )
    }

    signInUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((credentials)=>{
            console.log(credentials); 
            firebase.auth().currentUser.getToken().then(
                (token)=>{
                    this.token = token;
                    this.router.navigate(['/recipes'])
                }
            ) 
        }).catch(
            (error)=>console.log(error)
        )
    }

    getToken(){
        firebase.auth().currentUser.getToken().then(
            (token)=>{
                this.token = token;
            }
        ).catch(
            (error)=>console.log(error)
        )
        return this.token;
    }

    isAuthenticated(){
        return this.token != null;
    }

    userLogout(){
        firebase.auth().signOut();
        this.token = null;
    }
}