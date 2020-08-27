import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router :Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
console.log(this.registerForm.value)
      // stop here if form is invalid
      // debugger

      if (this.registerForm.invalid) {
          return;
      }
      else if(this.registerForm.value.email=="john@gmail.com" && (this.registerForm.value.password == "123456")){
        this.router.navigate(['/budget'])
        swal.fire({
          title: 'Successfully Login !!!',
          icon: "success",
          timer: 1000
        });

      }
      else{
        swal.fire({
          title: 'Invalid  credential !!!',
          icon: 'warning',
          timer: 1000
        });
        this.registerForm = this.formBuilder.group({
     
          email: [''],
          password: ['']
      });
        this.router.navigate(['/'])
       
      }

      // alert('SUCCESS!! :-)')
  }

}
