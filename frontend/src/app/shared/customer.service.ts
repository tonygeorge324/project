import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './customer.model';

@Injectable()
export class CustomerService {
  selectedCustomer:Customer;
  customers: Customer[];
  readonly baseURL = 'http://localhost:3000/customer';
  constructor(private http : HttpClient) { }
  postCustomer(emp:Customer){
return this.http.post(this.baseURL, emp)
  }
  getCustomerList(){
    return this.http.get(this.baseURL)
  }

  putCustomer(emp: Customer) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteCustomer(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
