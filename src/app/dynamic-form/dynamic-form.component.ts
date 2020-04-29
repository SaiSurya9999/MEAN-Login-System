import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  data:any = ""; isSubmitted:boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  dynamicForm = this.formBuilder.group({
    dForm: this.formBuilder.array([this.addFormGroup()])
    
  })
  onRemove(i){
    if(i != 0){
      this.addForm.removeAt(i);
    }
  
  }
  addFormGroup(): FormGroup{
        return this.formBuilder.group({
          email: ['',Validators.required],
          password:['',Validators.required],
          add: ['',Validators.required]
        });
  }
  get addForm(){
    this.isSubmitted=false;
    return this.dynamicForm.get("dForm") as FormArray;
  
  }
  get elements(){
    return this.dynamicForm.get("dForm") as FormArray;
  }
  
  onClick(){
    this.addForm.push(this.addFormGroup());
   
  }
  onSubmit(){
    if (this.dynamicForm.invalid) {
      this.isSubmitted=true;
      //alert("Form Has Errors");
  }
  else
  {
    this.data = this.dynamicForm.value;
    console.log(this.data);
    swal.fire("Successfully Submitted", "Check Console For Submitted Form Details", "success");
  }
  }
  style(){
  
      return {"cursor": "not-allowed"}
    
  }
}
