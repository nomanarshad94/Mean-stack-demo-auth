import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  error:string;
  constructor(private auth: AuthenticationService) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      this.error=err;
      console.error(err);
    });
  }
}
