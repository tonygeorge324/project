import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],//inject user service
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//regular expression for correct email addfress
  showSucessMessage: boolean;//to show sucess arrow fn
  serverErrorMessage:string;//to show err message

  constructor( public userService: UserService, private router : Router ) { }//userservice parameter

  ngOnInit(): void {
    
  }
  onSubmit(form: NgForm){//single parameter form its type ngForm
    this.userService.postUser(form.value).subscribe(//we can submit form we need node js api form.value will give details of new user from html cntrls
res =>{//subscrivbe fn it has 2 fn suc res1 function success arrow fn
  this.showSucessMessage = true;
  setTimeout(() => this.showSucessMessage = false,4000)//duration in milli second 
  this.router.navigateByUrl('/login');
  this.resetForm(form);//reset fn
},
err =>{//err 2nd function
  if(err.status  === 422){//server error status code
    this.serverErrorMessage = err.error.join('<br/>');
  }
  else
  this.serverErrorMessage = 'Something went wrong. Please contact admin '
}
    );

    }
    resetForm(form:NgForm){//if we register form..after successful registration we need to reset form to type new
      this.userService.selectedUser = {//selecteduser class object
        fullName: '',
        email: '',
        password: ''
      };
      form.resetForm();//resetform fn
      this.serverErrorMessage = '';
    }
  }

