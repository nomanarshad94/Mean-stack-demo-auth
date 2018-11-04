import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';


export class StringSave {

    credentials: TokenPayload = {
        email: '',
        name: '',
        password: ''
      };
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  setStrings(s1:string,s2:string,s3:string){
      this.auth.getUserDetails();
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }  
}
