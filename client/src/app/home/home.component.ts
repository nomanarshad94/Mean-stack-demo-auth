import { Component } from '@angular/core';
import {AuthenticationService, UserDetails,TokenPayload} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user: UserDetails;
  check:boolean;
  numbers: number[];
  numbers1: number[];
 

  reqstr:string;
  reqstr1: string;
  longcomonstring:string;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    string1:'',
    string2:'',
    longestSubSeqString:'',
    
  };


  constructor(public auth: AuthenticationService,private router: Router){
    
    
       
    this.user=auth.getUserDetails();
    if (this.user) {
      this.check= this.user.exp > Date.now() / 1000;
    } else {
      this.check= false;
    }
  
    this.numbers = new Array(91).fill(0).map((x,i)=>10+i); 
    this.numbers1 = new Array(91).fill(0).map((x,i)=>10+i); 
  }
  ngOnInit() {
  
  
  }
  refresh(): void {
    window.location.reload();
}
 genstring(s:number){
   this.reqstr= this.stringgenerator(s);
   this.credentials.string1=this.reqstr;
 }
 genstring1(s:number){
  this.reqstr1= this.stringgenerator(s);
  this.credentials.string2=this.reqstr1;
  
}
stringgenerator(n:number): string {

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i <n; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  this.user.longestSubSeqString=text;
  return text;
}

findLongestseq() {

  //uncomment below part if sequence of character matters!
   /*  var longest:number = 0;
    var longestSubstring:string = "";
    var str1:string=this.reqstr;
    var str2:string=this.reqstr1;
    var substring:string ="";
    for (var i=0; i < str1.length; ++i) {
        for (var j=i+1; j <= str1.length; ++j) {
            substring = str1.substring(i, j);
            if (str2.includes(substring) && substring.length> longest) {
                longest = substring.length;
                longestSubstring = substring;
            }
          
          }
    }

    this.longcomonstring= longestSubstring; */
    //uncomment till here and comment below part if sequence matters!

    var x=this.reqstr;
    var y=this.reqstr1;
    var s,i,j,m,n,
		lcs=[],row=[],c=[],
		left,diag,latch;
	if(m<n){s=x;x=y;y=s;}
	m = x.length;
	n = y.length;
	//build the c-table
	for(j=0;j<n;row[j++]=0);
	for(i=0;i<m;i++){
		c[i] = row = row.slice();
		for(diag=0,j=0;j<n;j++,diag=latch){
			latch=row[j];
			if(x[i] == y[j]){row[j] = diag+1;}
			else{
				left = row[j-1]||0;
				if(left>row[j]){row[j] = left;}
			}
		}
	}
	i--,j--;
  var t=i;
	while(i>-1&&j>-1){
		switch(c[i][j]){
			default:i--,j--;
				continue;
			case (i&&c[i-1][j]):
				if(t!==i){lcs.unshift(x.substring(i+1,t+1));}
				t=--i;
				continue;
			case (j&&c[i][j-1]): j--;
				if(t!==i){lcs.unshift(x.substring(i+1,t+1));}
				t=i;
		}
	}
	if(t!==i){lcs.unshift(x.substring(i+1,t+1));}
  this.longcomonstring= lcs.join('');
//comment till here


}


  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

savetodb(){
  this.credentials.longestSubSeqString=this.longcomonstring;
  this.credentials.email=this.user.email;
  this.credentials.name=this.user.name;

  if(this.user){
    console.log('hi: '+this.user._id);
    this.auth.saveData(this.credentials).subscribe(/* () => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    } */);
  }else{
    console.error("You are not logged in!");
  }


  
}
}
