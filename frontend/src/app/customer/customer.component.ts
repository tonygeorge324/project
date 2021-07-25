import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer.model'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
declare var M:any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers:[CustomerService]
})
export class CustomerComponent implements OnInit {

  constructor( public customerService: CustomerService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshCustomerList()
  }
resetForm(form?:NgForm){
  if(form)
  form.reset();
  this.customerService.selectedCustomer ={
_id:"",
name:"",
invoice:"",
reference:"",
amount:null
  }
}
onSubmit(form: NgForm){
  if (form.value._id == "") {
    this.customerService.postCustomer(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshCustomerList();
      M.toast({ html: 'Saved successfully', classes: 'rounded' });
    });
  }
  else {
    this.customerService.putCustomer(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshCustomerList();
      M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });
  }
}
refreshCustomerList(){
  this.customerService.getCustomerList().subscribe((res) =>{
    this.customerService.customers = res as Customer[]
  })
}

onEdit(emp: Customer) {
  this.customerService.selectedCustomer = emp;
}

onDelete(_id: string, form: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.customerService.deleteCustomer(_id).subscribe((res) => {
      this.refreshCustomerList();
      this.resetForm(form);
      M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}
openDialog(){

  this.dialog.open(PopupComponent);
  
}

}
