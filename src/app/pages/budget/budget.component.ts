import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  registerForm: FormGroup;
  dateForm:FormGroup;
  submitted = false;
  arry=[]
  sum:number=0
  options=[]
  new_arry:any
  showTable:boolean=false
  buttonDisable:boolean=true
  today = new Date();
  search_date:any
  today_date:any
 showExpandature:boolean
 buttonDisableSearch:boolean=true
  sum_data: number;
  constructor(private formBuilder: FormBuilder, private router :Router) { 
      let date_data= new Date()
      console.log(date_data)
        let number_un=date_data.getDate()
  this.today_date=date_data.getMonth()+1+"/"+number_un+"/"+date_data.getFullYear()

  }

ngOnInit(): void {

          this.options = ["car", "bike", "tea","food","shopping","house rent"];
          this.registerForm = this.formBuilder.group({
          
            email: ['', Validators.required],
            password: ['', Validators.required],
            

        });

        this.dateForm = this.formBuilder.group({
          
          datte: [''],
    
          

      });
          if(JSON.parse(localStorage.getItem("getData")) == null){
            this.showTable = false;
            
          }
          
          else if(JSON.parse(localStorage.getItem("getData")).length !=0 ){
            this.showTable = true;
            this.arry= JSON.parse(localStorage.getItem("getData"))
            this.sum= JSON.parse(localStorage.getItem("sumData"))
          }
        
          else{
            this.showTable = false;

          }
        
        
      
}

onSubmitDate(){
            let date_data= new Date(this.dateForm.value.datte)
            let number_un=date_data.getDate()+1
            
            this.search_date=date_data.getMonth()+1+"/"+number_un+"/"+date_data.getFullYear()


            // console.log(this.arry)
            let new_arr=this.arry.map((task,i) => {
              debugger
          if(task.full_date ==  this.search_date){
            this.showTable=true
            this.showExpandature=false

            //  console.log(i)
            let newpop=this.arry.slice(i,1)
            // this.arry=newpop
            console.log(newpop)
            console.log(this.arry)

          }
        else{
          this.sum_data=0
        this.showExpandature=true
          this.showTable=false
        }

       })


}


get f() { return this.registerForm.controls; }

onSubmit() {
      this.submitted = true;
      this.buttonDisable=true
      this.showExpandature=false
this.buttonDisableSearch=false
      if (this.registerForm.invalid) {
          return;
      }
      // this.showTable=true
     
      let obj={email:this.registerForm.value.email,password:this.registerForm.value.password,full_date:this.today_date}

      // console.log(obj)

      this.arry.push(obj)
      console.log(this.arry)
      this.showTable = true;

        swal.fire({
          title: 'Successfully added',
          icon: "success",
          timer: 1000
        });
  
      this.sum += parseInt(this.registerForm.value.password)
      console.log(this.sum)
      localStorage.setItem("sumData",JSON.stringify(this.sum))
      // }
      this.registerForm = this.formBuilder.group({
          
        email: [''],
        password: ['']
      });
            // alert('SUCCESS!! :-)')
      localStorage.setItem("getData",JSON.stringify(this.arry))
  }


  deleteData(k){
            swal.fire({
              title: 'Successfully deleted',
              icon: "success",
              timer: 1000
            });
          let rem_data=this.arry.splice(k,1);
          this.sum=this.sum - parseInt(rem_data[0].password)
          localStorage.setItem("getData",JSON.stringify(this.arry))
          localStorage.setItem("sumData",JSON.stringify(this.sum))


          if(JSON.parse(localStorage.getItem("sumData"))  == 0){
            this.showTable = false;

          }

  }

selectedCountry:any
  countryChanged(value) {
    this.selectedCountry = value;
    console.log(this.selectedCountry);
    this.buttonDisable=false
  }


  log(){
    // localStorage.clear()
    this.router.navigate(['/'])

  }
}
